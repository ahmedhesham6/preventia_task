# Default

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 1.6.7.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `-prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).

## Generic Components

/\*

    Displayed Columns is divided in two object:

    - First object "form" object clarifies the form input attributes in form of cards,
        Each card is addressed as object in the form array.
        Each card has title and array of inputs.
        The inputs define each input parameters :
          *Name : is the label shown in the html
          *Type : Type of input data (String,email,number,select)
          *Gate : is the key of the input data to be valid for backend
          *Required: boolean to know if the input is required or not

    - Second object "list" object is required fo the list component
        It Showes the displayed columns in array elements of "list"
        Each element describes the shown column element:
          *Display : the UI header of the column
          *Type : type of data to be shown (array, string , number)
          *key : backend suitable key to access the required information

\*/
