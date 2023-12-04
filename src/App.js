import './App.css';
import { useEffect, useState } from 'react';
import {
  Pets 
 } from './ui-components';
import {
  NavBarHeader 
 } from './ui-components';
import {
  Footer 
 } from './ui-components';
import {
  AddPet 
 } from './ui-components';
import {
  PetDetail 
 } from './ui-components';
import { withAuthenticator, } from '@aws-amplify/ui-react';

import { uploadData } from 'aws-amplify/storage';





function App({user, signOut}) {
  // Genera un nombre único para el archivo
  const timestamp = new Date().getTime();
  const filename = `archivo_${timestamp}.txt`;

  // Contenido del archivo de texto que deseas crear
  const contenido = 'Este es el contenido del archivo de texto que estoy creando en el momento.';

  
  // Crea un Blob con el contenido del archivo y especifica el tipo de contenido (en este caso, texto/plain)
  const blob = new Blob([contenido], { type: 'text/plain' });

  // Crea un objeto File a partir del Blob
  const file = new File([blob], filename, { type: 'text/plain' });


  async function saveFile(){
    try {
      const result = await uploadData({
        key: filename,
        data: file
      }).result;
      console.log('Succeeded: ', result);
    } catch (error) {
      console.log('Error : ', error);
    }
  }
  

  const [showForm, setShowForm] = useState(false)
  const [showDetails, setShowDetails] = useState(false)
  const [pet, setPet] = useState()
  const [updatePet, setUpdatePet] = useState()

  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [breed, setBreed] = useState("");
  const [about, setAbout] = useState("");
  const [image, setImage] = useState("");
  const [color, setColor] = useState("");


  const formOverride = {
    TextField29766922: {
      placeholder: name
    },
    TextField29766923: {
      placeholder: age
    },
    TextField29766924: {
      placeholder: breed
    },
    TextField48511201: {
      placeholder: about
    },
    TextField48511208:{
      placeholder: color
    },
    TextField48511215: {
      placeholder: image
    },
    image: {
      src: updatePet == null 
      ? "https://cdn.pixabay.com/photo/2020/10/21/00/35/dog-5671778_640.jpg"
      : updatePet.image,
    },
    Button48511238: {
      isDisabled: updatePet ? true : false,
    },
    Button29766926: {
      isDisabled: updatePet ? true : false,
    },
    MyIcon: {
      style: {
        cursor: "pointer",
      },
      onClick: () => {
        setShowForm(false)
      }
    }
    }
  const overrideDetails = {
      Close: {
        onClick: () => {setShowDetails(false)},
        style: {cursor: "pointer"}
      }
  }
  const navbarOverrides = {
    Button: {
      onClick: signOut
    },

    image: {
      src: "https://cdn.pixabay.com/photo/2020/12/21/08/36/dog-5849152_640.jpg"
    },
    "Add Pet": {
      style: {
        cursor: "pointer"
      },
      onClick: () => {
        saveFile()
        setShowForm(!showForm)
      }
    }
  }
  return (
    <div className="App">
      <NavBarHeader width={"100%"}
      overrides={navbarOverrides} />
      <header className="App-header">
        {
          showForm && (
            <AddPet 
              pet={updatePet}
              overrides={formOverride}
              style={{
                textAlign: "left",
                margin: "1rem"
              }}/>
          )
        }
        {
          showDetails && (
            <PetDetail 
            pet={pet}
            style={{
              textAlign: "left",
              margin: "1rem"
            }}
            overrides={overrideDetails}
            />
          )}
      
      <Pets 
        overrideItems={({item, index})=> ({
          overrides: {
            Breed: {color: "blue"},
            Button29766907: {
              onClick: () => {setShowDetails(!showDetails)
              setPet(item)
            }},
            Button4848427: {
              onClick: () => {
                if (!showForm) setShowForm(true)
                setUpdatePet(item)
                setName(item.name)
                setAge(item.age)
                setBreed(item.breed)
                setAbout(item.about)
                setImage(item.image)
                setColor(item.color)
              }
            }
          }
        })}
      />

      </header>
      <Footer width={"100%"}/>
    </div>
  );
}

export default withAuthenticator(App);
