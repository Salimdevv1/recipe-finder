import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios'
import React, { useState } from 'react'
import ModalComp from './ModalComp'


export default function App() {
  const [ingredient , setIngredient ] = useState()
  const [recipe , setRecipe ] = useState([])
  const [show , setShow ] = useState({show : false , index:0})
   const handleClick =() =>{
    document.getElementById('loading').style.display = "block"
    axios.get(`https://www.themealdb.com/api/json/v1/1/search.php?s=${ingredient}`).then(res=>setRecipe(res.data.meals)).catch(err=>console.log(err))
    document.getElementById('inputField').value = ""
    document.getElementById('loading').style.display = "none"

  }  
  const toggleShow  = (x) => {
    setShow((prev)=>{return{show:!prev.show , index:x}})
    console.log(show)
  }
    return (
    <div>

      <div className='header'>
        <center><h2>Recipe Finder By Salimdev</h2></center>
        <div className='search-box'>
          <input type="text" placeholder='Enter an ingredient'  onChange={(e)=>setIngredient(e.target.value)} id='inputField'/>
          <button onClick={handleClick}>Search</button>
        </div>
      </div>
      <p id='loading' style={{textAlign :"center" , fontSize : 40 , display :"none"}}>Loading....</p>
      <div className='row'>
      <center><div className='container'>
      {recipe.map((item)=>(
      <center><div className='col-3' key={item.idMeal}>
          <center><div className='recipe-item'>
              <img src={item.strMealThumb} alt="" className='meal-photo' />
              <p className='meal-title'>{item.strMeal}</p>
              <p className='category'> <span style={{fontWeight :700 , fontSize : 20}}>Category : </span> {item.strCategory}</p>
              <button className='toggle-btn' onClick={()=>toggleShow(item.idMeal)}>Instructions</button>
              <div>
                {show.index==item.idMeal?(
                   <ModalComp show={show.show}  id={item.idMeal} setShow={toggleShow} img={item.strMealThumb} details={item.strInstructions} ><img src={item.strMealThumb} alt="" className='meal-photo' /></ModalComp>

                ) : null}
              </div>
              
            
              </div></center>
       </div></center>       
      ))}
      
      </div></center>
      </div>
     
      </div>
    
  )
}
