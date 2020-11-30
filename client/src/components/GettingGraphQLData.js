import React from "react";
import './GettingGraphQLData.css';
import {
    useQuery,
    gql
  } from "@apollo/client";

function GettingGraphQLData() {
    const { loading, error, data } = useQuery(gql`
        {
            people {
                id
                firstName
                lastName
            }
        }
    `);
  
    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error :(</p>;
  
    return (
        <>
            <div className="list-type5">
                <h3>Graph List</h3><br/>
                <ol>
                {data?.people?.map(p => (
                    <li key={p.id}><a>{p.firstName} {p.lastName}</a></li>
                ))}
                </ol>
            </div>
        </>
    );
}
export default GettingGraphQLData;