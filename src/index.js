import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root'));

//Mebuat komponen dengan props
function Clock1(props) {
  return (
    <div>
      <h1>Hello World!</h1>
      <h2>it is {props.date.toLocaleTimeString()}.</h2>
    </div>
  );
}

//Membuat komponen dengan class yang di extends ke React Component
class Clock extends React.Component {
  //versi sekarang
  constructor(props){
    super(props);
    this.state = {
      date :new Date()
    }
  }
  // dipanggil saat component di panggil untuk setting
  componentDidMount(){
    this.timerID = setInterval(
      () => this.tick()
      , 1000)
  }
  componentWillMount(){
    clearInterval(this.timerID);
  }
  tick(){
    this.setState({
      date: new Date()
    });
  }

  render(){
    return(
    <div>
      <h1>Hello World!</h1>
      <h2>it is {this.state.date.toLocaleTimeString()}.</h2>
    </div>
    );
  }
}

class Organisasi extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      listOrganisasi: []
    }
  }

  ambilDataDariServerAPI = () => {            //fungsi untuk mengambil data dari API dengan penambahan sort dan order
    fetch('https://my-json-server.typicode.com/sitiaisyah14/json/organisasi')  // Penambahan sort dan order berdasarkan parameter
        .then(response => response.json())               // ubah response data dari URL API menjadi sebuah data json
        .then(jsonHasilAmbilDariAPI => {                 // data json hasil ambil dari API kita masukkan ke dalam listArtikel pada state
            this.setState({
                listOrganisasi: jsonHasilAmbilDariAPI
            })
        })
  }
  // dipanggil saat component di panggil untuk setting
  componentDidMount(){
    this.ambilDataDariServerAPI()
  }
  componentWillMount(){
    
  }

  render(){
    return(
      <div class="list-group w-auto d-flex p-2"> 
        {this.state.listOrganisasi.map((organisasi)=>{
          return (
            <a href="#" class="list-group-item list-group-item-action d-flex gap-3 py-3" aria-current="true">
            <img src="https://github.com/twbs.png" alt="twbs" width="32" height="32" class="rounded-circle flex-shrink-0"/>
            <div class="d-flex gap-2 w-100 justify-content-between">
            <div>
              <h6 class="mb-0">{organisasi.id}</h6>
              <p class="mb-0 opacity-75">{organisasi.nama}</p>
            </div>
              <small class="opacity-50 text-nowrap">now</small>
            </div>
            </a>
          );
        })}
      </div>
    );
  }
}

function Upp(){
  return(
    <div>
      <Clock />
      <Organisasi />
    </div>
  );
}

root.render(<Upp />);


// function tick(){
//   const element = <Clock date={new Date()} />
//   root.render(
//     element
//   );
// }

// setInterval(tick, 1000)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();