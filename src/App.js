import React, { useContext } from 'react';
import { CrudContext } from './context';


const App = () => {
  
  const [state, dispatch] = useContext(CrudContext);
    
  return (
    <div>
        <select onChange={(e) => dispatch({type:"ON_SELECT", payload: e.target.value})} >
          <option value='id'>id</option>
          <option value='name'>name</option>
          <option value='status'>status</option>
        </select>
        <input onChange={(e) => dispatch({ type: 'SEARCH', payload: e.target.value })} type='text' placeholder='Search...'/>
        <br/>
        <br/>
        <input onChange={(e) => dispatch({type: "GET_INPUT_VALUE", payload:{value: e.target.value, field: e.target.name} })} name='name' type='text' placeholder='name'/>
        <input onChange={(e) => dispatch({type: "GET_INPUT_VALUE", payload:{value: e.target.value, field: e.target.name} })} name='status' type='text' placeholder='surname'/>
        <button onClick={()=> dispatch({type: "ON_CREATE"})} >addUser</button>
        <table border='1px' width='600px' style={{ borderCollapse: 'collapse' }}>
        <thead>
          <tr>
            <th>Id</th>
            <th>Name</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {state.data.map((value) => (
            <tr key={value.id}>
              <td>{value.id}</td>
              <td>
                {
                  state.select === value.id ?
                  <input
                  onChange={(e) => dispatch({ type: "GET_INPUT_VALUE", payload: {value: e.target.value, field: e.target.name} })}
                      value={state.name}
                      name='name'
                      type='text'
                  /> :
                  value.name
                }
              </td>
              <td>
              {
                  state.select === value.id ?
                  <input
                  onChange={(e) => dispatch({ type: "GET_INPUT_VALUE", payload: {value: e.target.value, field: e.target.name} })}
                      value={state.status}
                      name='status'
                      type='text'
                  /> :
                  value.status
                }
              </td>
              <td>
                <button onClick={() => dispatch({ type: "ON_DELETE", payload: { ids: value.id } })} >delete</button>
                {
                  state.select === value.id ?
                  <button onClick={()=> dispatch({type: "ON_SAVE"})} >Save</button> :
                  <button onClick={()=> dispatch({type: "ON_UPDATE", payload: {allData: value}})}>edit</button>
                }
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default App