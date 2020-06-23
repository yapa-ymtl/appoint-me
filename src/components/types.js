import React from 'react';
import Select from 'react-select';
import 'bootstrap/dist/css/bootstrap.min.css';

const techCompanies = [
    {label:"Medical Center",value:1},
    {label:"Saloon",value:2},
    {label:"Shop",value:3},
    {label:"Other",value:4},
  ];

const App = () => (
      <div className="col-md-5 col-sm-8">
          <label htmlFor="defaultFormRegisterNameEx" className="grey-text">
                Business type
        </label>
        <Select options={ techCompanies } />
      </div>
);

export default App