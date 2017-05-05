angular.module('advanced-Multiselect-Example', ['advancedMultiselect'])
	.controller('HomeCtrl', function($scope) {
		
		$scope.countriesPlaceholder = 'Select Countries/States/Cities';
		$scope.countriesLabel = 'Countries/States/Cities';

		$scope.animalsPlaceholder = 'Select Animals';
		$scope.animalsLabel = 'Animals';
		
		$scope.countries = [
			{
				name: 'India',
				children: [
					{
						name: 'Karnataka',
						children: [
							{
								name: 'Bangalore'
							},
							{
								name: 'Mysore'
							},
							{
								name: 'Mangalore'
							}
						]
					},
					{
						name: 'Maharashtra',
						children: [
							{
								name: 'Mumbai'
							},
							{
								name: 'Pune'
							}
						]
					},
					{
						name: 'West Bengal',
						children: [
							{
								name: 'Kolkata'
							},
							{
								name: 'Asansol'
							},
							{
								name: 'Siliguri'
							}
						]
					}
				]
			},
			{
				name: 'USA',
				children: [
					{
						name: 'Alabama',
						children: [
							{
								name: 'Montgomery'
							},
							{
								name: 'Birmingham'
							}
						]
					},
					{
						name: 'California',
						children: [
							{
								name: 'Sacramento'
							},
							{
								name: 'Los Angeles'
							}
						]
					},
					{
						name: 'Florida',
						children: [
							{
								name: 'Jacksonville'
							},
							{
								name: 'Miami'
							},
							{
								name: 'Palm Beach'
							},
							{
								name: 'Orlando'
							}
						]
					}
				]
			},
			{
				name: 'UK',
				children: [
					{
						name: 'Greater Manchester',
						children: [
							{
								name: 'Manchester'
							},
							{
								name: 'Bolton'
							},
							{
								name: 'Stockport'
							},
							{
								name: 'Middleton'
							},
							{
								name: 'Leigh'
							}
						]
					},
					{
						name: 'Essex',
						children: [
							{
								name: 'Chelmsford'
							},
							{
								name: 'Harlow'
							},
							{
								name: 'Wickford'
							},
							{
								name: 'Colchester'
							}
						]
					}
				]
			}
		];

		$scope.animals = [
			{
				name: 'Dogs',
				children: []
			},
			{
				name: 'Cats',
				children: []
			},
			{
				name: 'Fishes',
				children: []
			}
		];

		$scope.animalSpecies = {
			'Dogs': [
				{
					name: 'Siberian Husky'
				},
				{
					name: 'Labrador'
				},
				{
					name: 'German Shepherd'
				},
				{
					name: 'Bulldog'
				}
			],
			'Cats': [
				{
					name: 'Abyssinian'
				},
				{
					name: 'American Curl'
				},
				{
					name: 'American Bobtail'
				},
				{
					name: 'Balinese'
				}
			],
			'Fishes': [
				{
					name: 'Guppy'
				},
				{
					name: 'Goldfish'
				},
				{
					name: 'Haddock'
				},
				{
					name: 'Zander'
				}
			]
		}

		$scope.getSpeciesFromAnimals = function(animal) {
			if(animal.showSubLevels && !animal.children.length) {
				var species = $scope.animalSpecies[animal.name];
				setTimeout(function() {
					animal.children = species;
					$scope.$applyAsync();
				}, 2000);
			}
		}

		function getSelectedValues(val) {
			var result = [];
			val.forEach(function(v) {
				if(v.isSelected) {
					result.push(v.name);
				} else if(v.children && v.children.length) {
					v.children.forEach(function(w) {
						if(w.isSelected) {
							result.push(w.name);
						} else if(w.children && w.children.length){
							w.children.forEach(function(x) {
								if(x.isSelected) {
									result.push(x.name);
								}
							});
						}
					});
				}
			});
			return JSON.stringify(result).trim();
		}

		$scope.$watch('countries', function(newVal, oldVal) {
			$scope.model1 = getSelectedValues(newVal);
		}, true);

		$scope.$watch('animals', function(newVal, oldVal) {
			$scope.model1 = getSelectedValues(newVal);
		}, true);
	});