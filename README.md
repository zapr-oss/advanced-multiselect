# Advanced Multiselect

Advanced multiselect is an Angular module which multi-selects items which are in a hierarchical manner (For example Countries->States->Cities). 
There are 3 states of visual indicator for a particular item, based on the selections of its child items:

1. If all the child items of a particular item are selected, then that item will show a check mark. (✓)
2. If all the child items of a particular item are not selected, then that item will not be displaying any mark. ( )
3. If some of the child items of a particular item are selected and the rest aren't, then that item will display an "indeterminate" mark. (-)

### Getting started
##### Prerequisites
    - AngularJS (1.4+)
    - UnderscoreJS (1.8+)
    - Bootstrap (3.0, CSS only)

Include the provided `advancedMultiselectDirective.js` and `advancedMultiselect.css` files in index.html.

Include the module as a dependency - `advancedMultiselect`

### Usage
Render the Advanced multiselect directive by using the following tag `<advanced-multiselect>`

##### Code Sample
```html
<advanced-multiselect label={{countriesLabel}} model=countries submenu-cb=getCitiesFromState default-placeholder=countriesPlaceholder></advanced-multiselect>
```

![Advanced Multiselect](https://image.ibb.co/gKvGqk/Multiselect_1.png)

#### Attributes
1. `label` - The title to be shown above the select dropdown.
2.  `model` - The data model to be populated in the select dropdown. It is an array of objects with a mandatory attribute `name` and optional `children` attribute if it has multiple levels
3.  `submenu-cb` - Optional. If an item has a `children` attribute with length=0, then a function attached to `submenu-cb` will be invoked on clicking on the show sublevel icon for that item, with the item being passed as the only argument to that function.
4.  `default-placeholder` - The default placeholder to be shown inside the select dropdown, when no items are selected.

### Contributing
Issues and PR's are much appreciated. Please describe the issue clearly, with proper steps to reproduce the same, while raising any.