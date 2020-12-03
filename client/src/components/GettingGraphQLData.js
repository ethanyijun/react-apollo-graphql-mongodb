import React, { useState, useEffect } from "react";
import { useLazyQuery, useMutation } from "@apollo/client";
import './GettingGraphQLData.css';
import {
    useQuery,
    gql
  } from "@apollo/client";

function GettingGraphQLData() {
    const [input, setInput] = useState("");
    const [fName, setfName] = useState("");
    const [lName, setlName] = useState("");

    const ADD_PEOPLE = gql`
    mutation People($firstName: String!, $lastName: String!) {
        people(firstName: $firstName, lastName: $lastName) {
        id
        firstName,
        lastName
      }
    }
  `;

    const GET_PEOPLE = input === ""? gql`
    query People {
        people {
            id
            firstName
            lastName
        }
    }
    `:
    gql`
    query People($firstName: String!) {
        peopleByName(firstName: $firstName) {
            id
            firstName
            lastName
        }
    }
    `;


    const [addRequest, { addedData }] = useMutation(ADD_PEOPLE);
    const [doRequest, { loading, data }] = useLazyQuery(GET_PEOPLE);
  
    // if (loading) return <p>Loading...</p>;

  
    return (
        <>
            <div className="list-type5">
            <input type="text" value={input} onChange={e => {
                setInput(e.target.value);
            }} />
            <button onClick={() => doRequest({ variables: { firstName: "Vin", lastName:"Disel" } })}>
                Find
            </button>
            <div>
                <label>
                    First Name:
                    <input type="text" value={fName} onChange={e => {
                        setfName(e.target.value);
                    }} />
                </label>
            <div>
            </div>
                <label>
                    Last Name:
                    <input type="text" value={lName} onChange={e => {
                        setlName(e.target.value);
                    }} />
                </label>
            </div>
            <button onClick={() => addRequest({ variables: { firstName: fName, lastName:lName } })}>
                Add
            </button>
                <h3>Graph List</h3><br/>
                <ol>
                {input === ""?
                data?.people?.map(p => (
                    <li key={p.id}><a>{p.firstName} {p.lastName}</a></li>
                )): data?.peopleByName?.map(p => (
                    <li key={p.id}><a>{p.firstName} {p.lastName}</a></li>
                ))
                }
                {}
                </ol>
            </div>
        </>
    );
}
export default GettingGraphQLData;