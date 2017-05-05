/*
Copyright (c) 2017-present, Red Brick Lane Marketing Solutions Pvt. Ltd.
All rights reserved.

This program is free software: you can redistribute it and/or modify
it under the terms of the GNU General Public License as published by
the Free Software Foundation, either version 3 of the License, or
(at your option) any later version.

This program is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU General Public License for more details.

You should have received a copy of the GNU General Public License
along with this program.  If not, see <http://www.gnu.org/licenses/>
*/
'use strict';
/*jshint unused:false*/

angular.module('advancedMultiselect', []);

angular.module('advancedMultiselect')
	.directive('checkboxIndeterminate', function() {
		return {
			link: function(scope, elem, attrs) {
				scope.$watch(attrs.checkboxIndeterminate, function(newVal) {
					elem[0].indeterminate = !!newVal;
				});
			}
		};
	})
	.directive('advancedMultiselect', function($document, $timeout) {
		return {
			restrict: 'E',
			templateUrl: 'advancedMultiselect/advancedMultiselect.html',
			scope: {
				label: '@',
				defaultPlaceholder: '=',
				model: '=',
				submenuCb: '=',
				disableStatus: '@'
			},
			link: function(scope, elem, attrs) {
				var isDescendant = function(parent, child) {
					var node = child.parentNode;
					while (node !== null) {
						if (node === parent) {
							return true;
						}
						node = node.parentNode;
					}
					return false;
				};

				$document.on('click',function(evt){
					var parentElement = elem[0].querySelector('.multiselect-values'),
					childElement = evt.target;
					var isChild = isDescendant(parentElement, childElement);
					if(!isChild) {
						$timeout(function() {
							scope.showOptions = false;
						}, 0);
					}
				});
			},
			controller: function($scope, $element, $attrs) {
				$scope.placeholder = $scope.defaultPlaceholder;
				var CONSTANTS = {
					INDETERMINATE: 'INDETERMINATE'
				};
				$scope.toggleOptions = function(evt) {
					$scope.showOptions = !$scope.showOptions;
					evt.stopPropagation();
				};

				$scope.toggleSubLevelOptions = function(obj) {
					obj.showSubLevels = !obj.showSubLevels;
					if(typeof $scope.submenuCb === 'function') {
						$scope.submenuCb(obj);
					}
				};

				function recursivelySelectAll(data, isSelected) {
					data.forEach(function(obj) {
						obj.isSelected = isSelected;
						if(obj.children) {
							recursivelySelectAll(obj.children, isSelected);
						}
					});
					return;
				}

				$scope.toggleChildSelections = function(obj) {
					var isSelected = !obj.isSelected;
					if(obj.children) {
						recursivelySelectAll(obj.children, isSelected);	
					}
				};

				$scope.toggleSelectAll = function(shouldToggle) {
					if(shouldToggle) {
						$scope.isSelectAll = !$scope.isSelectAll;
					}
					recursivelySelectAll($scope.model, $scope.isSelectAll);
				};

				

				function recursivelySetIndeterminate(data, indeterminate) {
					if(!data.children || !data.children.length) {
						return !!data.isSelected;
					} else {
						var childIsSelectedValues = {};
						for(var i=0; i<data.children.length; i++) {
							var childObj = data.children[i];
							var childSelectedVal = recursivelySetIndeterminate(childObj, indeterminate);
							if(childSelectedVal === CONSTANTS.INDETERMINATE) {
								indeterminate.val = true;
							}
							if(childIsSelectedValues[childSelectedVal]) {
								childIsSelectedValues[childSelectedVal]++;
							} else {
								childIsSelectedValues[childSelectedVal] = 1;
							}
						}
						if(childIsSelectedValues[CONSTANTS.INDETERMINATE] || Object.keys(childIsSelectedValues).length > 1) {
							data.isIndeterminate = true;
							data.isSelected = false;
							return CONSTANTS.INDETERMINATE;
						} else {
							data.isIndeterminate = false;
							data.isSelected = !!childIsSelectedValues.true;
							return data.isSelected;
						}
					}
				}

				function assignIndeterminates(newVal) {
					var atleastOneIndeterminate = {
						val: false
					};
					for(var i=0; i<newVal.length; i++) {
						var childObj = newVal[i];
						recursivelySetIndeterminate(childObj, atleastOneIndeterminate);
					}
					if(atleastOneIndeterminate.val) {
						newVal.isIndeterminate = true;
					} else {
						var rootObjectIndeterminates = _.groupBy(newVal, function(child) {
							return !!child.isIndeterminate;
						});
						if(rootObjectIndeterminates.true) {
							newVal.isIndeterminate = true;
						} else {
							var rootObjectSelecteds = _.groupBy(newVal, function(child) {
								return !!child.isSelected;
							});
							if(Object.keys(rootObjectSelecteds).length>1) {
								newVal.isIndeterminate = true;
							} else {
								newVal.isIndeterminate = false;
								$scope.isSelectAll = !!rootObjectSelecteds.true;
							}
						}
					}
				}

				function setPlaceholder(data) {
					var selectedVals = [];
					var childGroup = _.groupBy(data, 'isSelected');
					childGroup['true'] = childGroup['true'] || [];
					childGroup['true'].forEach(function(child) {
						selectedVals.push(child.name);
					});
					var unselectedParents = (childGroup['false']||[]).concat( (childGroup['undefined']||[]) );
					unselectedParents.forEach(function(child) {
						if(child.children) {
							var childGroup2 = _.groupBy(child.children, 'isSelected');
							childGroup2['true'] = childGroup2['true'] || [];
							childGroup2['true'].forEach(function(child2) {
								selectedVals.push(child2.name);
							});
							var unselectedParents2 = (childGroup2['false']||[]).concat( (childGroup2['undefined']||[]) );
							unselectedParents2.forEach(function(child2) {
								if(child2.children) {
									var childGroup3 = _.groupBy(child2.children, 'isSelected');
									childGroup3['true'] = childGroup3['true'] || [];
									childGroup3['true'].forEach(function(child3) {
										selectedVals.push(child3.name);
									});
								}
							});
						}
					});
					return selectedVals;
				}

				function addWatcher() {
					var unwatch = $scope.$watch('model', function(newVal, oldVal) {
						if(!angular.equals(newVal, oldVal)) {
							unwatch();
							assignIndeterminates(newVal);
							var x = setPlaceholder(newVal);
							if(x.length) {
								$scope.placeholder = x[0];
								if(x.length > 1) {
									$scope.placeholder += ' and '+(x.length-1)+' more selected';	
								}
							} else {
								$scope.placeholder = $scope.defaultPlaceholder;
							}
							addWatcher();
						}
					}, true);
				}

				$scope.init = function() {
					$scope.showOptions = false;
					addWatcher();
				};

				$scope.init();
			}
		};
	});