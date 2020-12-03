import React, { useState, useEffect } from "react";
import { useLazyQuery } from "@apollo/client";
import './GettingGraphQLData.css';
import {
    useQuery,
    gql
  } from "@apollo/client";

function GettingGraphQLData() {
    const [input, setInput] = useState("");

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

    const [doRequest, { loading, data }] = useLazyQuery(GET_PEOPLE);
    const handleNameChange = e => {
        setInput(e.target.value);
        console.log(input);
    };
  
    if (loading) return <p>Loading...</p>;

  
    return (
        <>
            <div className="list-type5">
            <input type="text" value={input} onChange={handleNameChange} />
            <button onClick={() => doRequest({ variables: { firstName: input } })}>
                Find
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