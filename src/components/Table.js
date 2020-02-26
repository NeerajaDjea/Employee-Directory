import React, { Component } from 'react';
import Icon from '@material-ui/core/Icon';


import MaterialTable from 'material-table';
// import Main from "./Main";

export default function MaterialTableDemo() {
    const [state, setState] = React.useState({
        columns: [
            {title:"Picture", field:'thumbnail'},
            { title: 'Title', field: 'title' },
            { title: 'Name', field: 'name' },
            { title: 'Surname', field: 'surname' },
            { title: 'Email', field: 'email' },
            { title: 'Age', field: 'age', type: 'numeric' },
            { title: 'Country', field: 'birthCountry' },
            

        ],
        data: [],

    });
    //const [data, setData] = React.useState([])

    React.useEffect(() => {

    
        // https://medium.com/javascript-in-plain-english/how-to-use-async-function-in-react-hook-useeffect-typescript-js-6204a788a435
        // Create an scoped async function in the hook
        async function getData() {

            const url = "https://api.randomuser.me/?results=25";
            const response = await fetch(url);
            const data = await response.json();
            console.log(data.results);

            const people = data.results.map(person => {
                return {
                    name: person.name.first,
                    title: person.name.title,
                    email: person.email,
                    surname: person.name.last,
                    birthCountry: person.location.country,
                    age: person.dob.age,
                    thumbnail: <img
                    src={person.picture.thumbnail}/>
                }
                

            })
           
            console.log(people);
            setState({...state, data: people })
        }

        // Execute the created function directly
        getData();
    }, []);


    return (
        
        
         < MaterialTable title = "Employee Details"
        columns = { state.columns }
        data = { state.data }
        editable = {
            {
                onRowAdd: newData =>
                    new Promise(resolve => {
                        setTimeout(() => {
                            resolve();
                            setState(prevState => {
                                const data = [...prevState.data];
                                data.push(newData);
                                return {...prevState, data };
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
                                    return {...prevState, data };
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
                                return {...prevState, data };
                            });
                        }, 600);
                    }),
            }
        }
        />
    );
}