import React from 'react';
import MaterialTable from 'material-table';

export default function MaterialTableDemo() {
  const [state, setState] = React.useState({
    columns: [
      { title: 'Title', field: 'title' },
      { title: 'Name', field: 'name' },
      { title: 'Surname', field: 'surname' },
      { title: 'email', field: 'email' },
      { title: 'Birth Year', field: 'birthYear', type: 'numeric' },
      {title:'Country', field:"country"},
      { title: 'Department', field: 'department' },
      
    ],
    data: [
     
      {
        title:'Mrs',
        name: 'Pamela',
        surname: 'Baran',
        birthYear: 1987,
        country: 'France',
        department: 'HR',
        email:"pam@outlook.com"
      },
      {
        title:'Mr',
        name: 'Brad',
        surname: 'Marks',
        birthYear: 1977,
        country: 'England',
        department: 'IT',
        email:"brad@outlook.com"
      },
      {
        title:'Mr',
        name: 'Patrick',
        surname: 'Mills',
        birthYear: 1984,
        country: 'England',
        department: 'Finance',
        email:"pat@outlook.com"
      },
      {
        title:'Miss',
        name: 'Tania',
        surname: 'Low',
        birthYear: 2000,
        country: 'England',
        department: 'IT',
        email:"tam@outlook.com"
      },
      {
        title:'Mrs',
        name: 'Nicky',
        surname: 'Hanks',
        birthYear: 1977,
        country: 'USA',
        department: 'Finance',
        email:"nickky@outlook.com"
      },
    ],
  });

  return (
    <MaterialTable
      title="Employee Details"
      columns={state.columns}
      data={state.data}
      editable={{
        onRowAdd: newData =>
          new Promise(resolve => {
            setTimeout(() => {
              resolve();
              setState(prevState => {
                const data = [...prevState.data];
                data.push(newData);
                return { ...prevState, data };
              });
            }, 600);
          }),
        onRowUpdate: (newData, oldData) =>
          new Promise(resolve => {
            setTimeout(() => {
              resolve();
              if (oldData) {
                setState(prevState => {
                  const data = [...prevState.data];
                  data[data.indexOf(oldData)] = newData;
                  return { ...prevState, data };
                });
              }
            }, 600);
          }),
        onRowDelete: oldData =>
          new Promise(resolve => {
            setTimeout(() => {
              resolve();
              setState(prevState => {
                const data = [...prevState.data];
                data.splice(data.indexOf(oldData), 1);
                return { ...prevState, data };
              });
            }, 600);
          }),
      }}
    />
  );
}
