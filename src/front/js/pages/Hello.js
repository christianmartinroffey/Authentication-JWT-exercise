import React, { useContext, useEffect } from 'react'
import { Context } from "../store/appContext";

function Hello() {

    const { store, actions } = useContext(Context);

    useEffect(() => {
        if(store?.token ){
        actions.getMessage()
        }
	},[ store.token] )

  return (
    <div>
        <h1>{store.message}</h1>
        <div className='card'>
        <p>Click to access your token {store.token}</p>
        </div>
    </div>
  )
}

export default Hello