import React, {ChangeEvent} from 'react';
import Icon from './components/Icon/icon'
import {Input} from './components/Input/input'
function App() {
    const onChange = ( e : ChangeEvent<HTMLInputElement>)=>{
        console.log('2222',e.target.value);
    }
  return (
    <div className="App">
      <hr/>
        <div style={{display:'flex',flexDirection:'row'}}>
            <Icon icon="spinner" spin theme={'success'} size="3x" style={{marginRight:'8px'}}/>
            <Icon icon="ad" theme={'danger'} size="3x" style={{marginRight:'8px'}}/>
            <Icon icon="inbox" theme={'info'} size="3x" style={{marginRight:'8px'}}/>
            <Icon icon="baby" theme={'info'} size="3x" style={{marginRight:'8px'}}/>
        </div>
      <hr/>
    </div>
  );
}

export default App;
