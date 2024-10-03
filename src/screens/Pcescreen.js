import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getClt } from '../actions/pceActions';
import AddPiecePopup from '../components/AddPiecePopup';

function Pcescreen() {
  const [_idClt, set_idClt] = useState('');
  const [Clt, setclt] = useState('');
  const [Designt, setDesignt] = useState('');
  const [NSerie, setNSerie] = useState('');
  const [Adresse, setAdresse] = useState('');
  const [pieces, setPieces] = useState([]);
  const [etat, setEtat] = useState('');
  const [dateRav, setDateRav] = useState('');
  const [type, setType] = useState('Rav');
  const [showPopup, setShowPopup] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  const [Cafe, setCafe] = useState('');
  const [QtCafe, setQtCafe] = useState('');
  const [Gob, setGob] = useState('');
  const [QtGob, setQtGob] = useState('');
  const [Spat, setSpat] = useState('');
  const [QtSpat, setQtSpat] = useState('');
  const [Lait, setLait] = useState('');
  const [Choco, setChoco] = useState('');
  const [Sucre, setSucre] = useState('');

  
  const dispatch = useDispatch();
  const cltState = useSelector(state => state.getCltReducer);
  const { data } = cltState || { data: [] };

  useEffect(() => {
    dispatch(getClt());
  }, [dispatch]);

  const handleSearchTermChange = (e) => {
    const value = e.target.value;
    const [id, client] = value.split(' - ');
    set_idClt(id);
    setclt(client);
    setSearchTerm(value); 
  };

  const handleAddPiece = (piece) => {
    setPieces([...pieces, piece]);
    setShowPopup(false);
  };

  const handleShowPopup = () => {
    setShowPopup(true);
  };

  const handleDeletePiece = (index) => {
    const newPieces = pieces.filter((_, i) => i !== index);
    setPieces(newPieces);
  };

  useEffect(() => {
    console.log('_idClt:', _idClt);
    console.log('Filtered machines:', data.filter(item => item._idClt === _idClt));
  }, [_idClt, data]);
  const uniqueClients = Array.from(new Map(data.map(item => [item._idClt, item])).values());

  return (
    <div>
      <div className='row justify-content-center'> 
        <div className='col-md-11 col-11 col-lg-6 text-start shadow-lg p-3 mb-5 mt-3 bg-body rounded'>
         
        <div className='flex-container row col-12'>
            <h2 className='align-items-center text-center' style={{color:'#163052'}}>MACHINES</h2>
  <div className="col-7 col-md-7 justify-content-center align-items-center mt-2 p-4">
    <label>Client</label>
    <input 
      required 
      type='text' 
      placeholder='Recherche par nom du client' 
      className='form-control mb-2'
      list="cltOptions"
      value={searchTerm} 
      onChange={handleSearchTermChange}
    />
    <datalist id="cltOptions">
      {uniqueClients.map(item => (
        <option key={item._idClt} value={`${item._idClt} - ${item.Clt} `}>
          {item._idClt} - {item.Clt} - {item.Adresse}
        </option>
      ))}
    </datalist>

    <label>Machine</label>
    <select
      required
      className='form-control mb-2'
      value={NSerie}
      onChange={(e) => {
        const selectedMachine = data.find(item => item.NSerie === e.target.value);
        setDesignt(selectedMachine.Designt);
        setNSerie(selectedMachine.NSerie);
        setAdresse(selectedMachine.Adresse);
      }}
    >
      <option value="">Select Machine</option>
      {data
        .filter(item => item._idClt === _idClt)
        .map((machine, index) => (
          <option key={index} value={machine.NSerie}>
            {machine.Designt} - {machine.NSerie} - {machine.Adresse}
          </option>
        ))
      }
    </select>

    <label>Date</label>
    <input 
      required 
      type='date' 
      placeholder='Date' 
      className='form-control mb-2'
      value={dateRav} 
      onChange={(e) => setDateRav(e.target.value)}
    />

    <label>Type</label>
    <select 
      required 
      className='form-control mb-2'
      value={type} 
      onChange={(e) => setType(e.target.value)}
    >
      <option value="Rav">Rav</option>
      <option value="Caisse">Caisse</option>
    </select>

    <label>Etat</label>
    <select 
      required 
      className='form-control mb-2'
      value={etat} 
      onChange={(e) => setEtat(e.target.value)}
    >
      <option value="Encours">Encours</option>
      <option value="Fermé">Fermé</option>
    </select>
  </div>

  <div className="col-5 col-md-5 d-flex justify-content-center align-items-center">
    <img src="../f494a66f68e7cb4274f9c15113ed0c2e.png" alt="Lavazza" style={{height: '450px', width: '50%'}} />
  </div>
</div>

          {type === 'Rav' && (
  <div className='shadow-lg p-3 mb-5 mt-3 bg-body rounded RavDiv '>
    {/* Coffee part */}
    <h2 className='align-items-center text-center m-3 mb-5' style={{color:'#163052'}}> RAVITAILLEMENT</h2>
    <div className='flex-container col-12 col-md-12 mx-auto'>
      <label className='my-auto text-center' style={{width:'25%'}}>Cafe </label>
      <select 
        required 
        className='form-control mx-2'
        style={{width:'40%', height:'40px'}}
        value={Cafe} 
        onChange={(e) => setCafe(e.target.value)}
      >
        <option value="BLINT">BLINT</option>
        <option value="BLGDC">BLGDC</option>
        <option value="GRAIN">GRAIN</option>
      </select>
      <input 
        required 
        type='text' 
        placeholder='Quantité' 
        className='form-control mb-2'
        style={{width:'20%'}}
        value={QtCafe} 
        onChange={(e) => setQtCafe(e.target.value)} 
      />
    </div>

    {/* Gobelets part */}
    <div className='flex-container px-2'>
      <label className='my-auto text-center' style={{width:'25%'}}>Gobelets </label>
      <select 
        required 
        className='form-control mx-2'
        style={{width:'40%', height:'40px'}}
        value={Gob} 
        onChange={(e) => setGob(e.target.value)}
      >
        <option value="GOB-160-TRANS">GOB-160-TRANS</option>
        <option value="GOB-CART-TCE-160">GOB-CART-TCE-160</option>
      </select>
      <input 
        required 
        type='text' 
        placeholder='Quantité' 
        className='form-control mb-2'
        style={{width:'20%'}}
        value={QtGob} 
        onChange={(e) => setQtGob(e.target.value)} 
      />
    </div>

    {/* Spatules part */}
    <div className='flex-container px-2'>
      <label className='my-auto text-center' style={{width:'25%'}}>Spatules </label>
      <select 
        required 
        className='form-control mx-2'
        style={{width:'40%', height:'40px'}}
        value={Spat} 
        onChange={(e) => setSpat(e.target.value)}
      >
        <option value="SPATULE">SPATULE</option>
        <option value="SPATULE-BOIS">SPATULE-BOIS</option>
      </select>
      <input 
        required 
        type='text' 
        placeholder='Quantité' 
        className='form-control mb-2'
        style={{width:'20%'}}
        value={QtSpat} 
        onChange={(e) => setQtSpat(e.target.value)} 
      />
    </div>
<div className='flex-container col-12 col-md-12 mt-4 mb-3'>  
    <div className='col-6 col-md-6'> 
           {/* Lait part */}
    <div className='flex-container'>
      <label className='my-auto text-center' style={{width:'50%'}}>Lait </label>
      <input 
        required 
        type='text' 
        placeholder='Quantité' 
        className='form-control mb-2 mx-4'
        style={{width:'32%'}}
        value={Lait} 
        onChange={(e) => setLait(e.target.value)} 
      />
    </div>

    {/* Chocolat part */}
    <div className='flex-container'>
      <label className='my-auto text-center' style={{width:'50%'}}>Chocolat </label>
      <input 
        required 
        type='text' 
        placeholder='Quantité' 
        className='form-control mb-2 mx-4'
        style={{width:'32%'}}
        value={Choco} 
        onChange={(e) => setChoco(e.target.value)} 
      />
    </div>

    {/* Sucre part */}
    <div className='flex-container'>
      <label className='my-auto text-center' style={{width:'50%'}}>Sucre </label>
      <input 
        required 
        type='text' 
        placeholder='Quantité' 
        className='form-control mb-2 mx-4'
        style={{width:'32%'}}
        value={Sucre} 
        onChange={(e) => setSucre(e.target.value)} 
      />
    </div> 
    
    </div>
    
    <div className="col-6 col-md-6 d-flex justify-content-center align-items-center mx-2">
    <img src="../7ad898ac-eb8d-4c52-a5c2-eadab8649933_lb-cups.jpg" alt="Lavazza" style={{height: '220px', width: '90%'}} />
  </div>

    </div>
   
   
   

  
  </div>
)}
                    {showPopup && <AddPiecePopup onClose={() => setShowPopup(false)} onAddPiece={handleAddPiece} />}
                    <button className='btn mt-3 mb-2 col-12 col-md-12' style={{backrgoundColor:'#0d6efd'}}>Valider</button>
        </div>
      </div>
    </div>
  );
}

export default Pcescreen;
