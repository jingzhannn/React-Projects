import { useState, useEffect } from "react";
import CharacterCard from "./CharacterCard";
import VisionSpinner from "./VisionSpinner";
import "../style.css"

function CharacterGrid(){

    const [details, setDetails] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(()=>{

        async function loadCharacters(){

            setLoading(true);

            try{

                const res = await fetch("https://genshin.jmp.blue/characters");
                const names = await res.json();

                const details = await Promise.all(
                    names.map(async (name) =>{
                        const res = await fetch(`https://genshin.jmp.blue/characters/${name}`);
                        return await res.json();
                    })
                );

                setDetails(details);
                
                setLoading(false);
            } catch(err){

                console.error(err);
            }
            finally{

                console.log("Attempt Fetch Completed");
            }
        };

        loadCharacters();

    }, []);


    if(loading){

        return(
            <VisionSpinner />
        )
    }

    return(
        <div className="character-grid">
            {details.map((char) => (
            <CharacterCard key={char.id} char={char} icon={`https://genshin.jmp.blue/characters/${char.id.toLowerCase()}/icon`}/>
        ))}
        </div>
        
    )
 
}

export default CharacterGrid;