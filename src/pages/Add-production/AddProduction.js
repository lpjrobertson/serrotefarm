import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; 
import { auth, db } from '../firebase';
import { collection, addDoc, getDocs, doc, deleteDoc, updateDoc, query, where } from 'firebase/firestore';

import './addProduction.css';

const AddProduction = () => {
  const [fruitName, setFruitName] = useState('');
  const [amount, setAmount] = useState('');
  const [weight, setWeight] = useState('');
  const [date, setDate] = useState('');
  const [notes, setNotes] = useState('');
  const [harvests, setHarvests] = useState([]);
  const [editId, setEditId] = useState(null);

  const navigate = useNavigate(); 
  const harvestCollection = collection(db, 'harvests');

  
  const fetchHarvests = async () => {
    const userId = auth.currentUser.uid; 
    const q = query(harvestCollection, where('userId', '==', userId)); 

    const data = await getDocs(q);
    setHarvests(data.docs.map(doc => ({ ...doc.data(), id: doc.id })));
  };

  useEffect(() => {
    fetchHarvests();
  }, []);

  
  const saveHarvest = async () => {
    if (!fruitName || !amount || !weight || !date) {
      alert('Please fill in all fields.');
      return;
    }

    const newHarvest = { fruitName, amount, weight, date, notes, userId: auth.currentUser.uid };

    if (editId) {
      const harvestDoc = doc(db, 'harvests', editId);
      await updateDoc(harvestDoc, newHarvest);
      setEditId(null);
    } else {
      await addDoc(harvestCollection, newHarvest);
    }

    setFruitName('');
    setAmount('');
    setWeight('');
    setDate('');
    setNotes('');
    fetchHarvests();
  };

  const deleteHarvest = async (id) => {
    const harvestDoc = doc(db, 'harvests', id);
    await deleteDoc(harvestDoc);
    fetchHarvests();
  };

  const editHarvest = (harvest) => {
    setFruitName(harvest.fruitName);
    setAmount(harvest.amount);
    setWeight(harvest.weight);
    setDate(harvest.date);
    setNotes(harvest.notes);
    setEditId(harvest.id);
  };

  return (
    <div className="add-production">
      <div className="back-button">
        <button onClick={() => navigate('/dashboard')}>Back to Dashboard</button>
      </div>

      <h1>Add Daily Harvest</h1>

      <div className="form">
        <input
          type="text"
          placeholder="Fruit Name"
          value={fruitName}
          onChange={(e) => setFruitName(e.target.value)}
        />
        <input
          type="number"
          placeholder="Amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />
        <input
          type="text"
          placeholder="Weight (e.g., 10kg)"
          value={weight}
          onChange={(e) => setWeight(e.target.value)}
        />
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />
        <textarea
          placeholder="Notes"
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
        ></textarea>

        <button onClick={saveHarvest}>{editId ? 'Update Harvest' : 'Save Harvest'}</button>
      </div>

      <div className="harvest-list">
        {harvests.map((harvest) => (
          <div key={harvest.id} className="harvest-item">
            <p><strong>Fruit:</strong> {harvest.fruitName}</p>
            <p><strong>Amount:</strong> {harvest.amount}</p>
            <p><strong>Weight:</strong> {harvest.weight}</p>
            <p><strong>Date:</strong> {harvest.date}</p>
            <p><strong>Notes:</strong> {harvest.notes}</p>
            <button onClick={() => editHarvest(harvest)}>Edit</button>
            <button onClick={() => deleteHarvest(harvest.id)}>Delete</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AddProduction;