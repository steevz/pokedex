import React, { useState, useEffect } from 'react';
import axios from 'axios'
import styled from "styled-components"
import tw from "twin.macro"

import './assets/styles.css'

const Container = styled.div`
  ${tw`container bg-transparent p-0 mx-auto my-0`}
`

const Wrapper = styled.div`
  ${tw`flex flex-col md:flex-row justify-around items-center`}
`

const Row = styled.div`
  ${tw`flex flex-col justify-start items-center my-3`}
`
const Number = styled.p`
  ${tw`text-2xl text-white font-black`}
`

const Name = styled.h1`
  ${tw`text-2xl text-white font-black uppercase`}
`

const JapanesseName = styled.h2`
  ${tw`text-6xl text-white font-black uppercase`}
`

const PokemonImage = styled.img`
  object-fit: contain;
  height: 18rem;
`

const StatCard = styled.span`
  ${tw`inline-block bg-gray-200 rounded-lg px-5 py-2 text-sm font-semibold text-gray-700 my-2 uppercase`}
`

const PokeForm = styled.form`
  ${tw`px-8 pt-6 pb-8 mb-4`}
`

const PokeLabel = styled.label`
  ${tw`block text-white text-sm font-bold mb-2`}
`

const PokemonInput = styled.input`
  ${tw`bg-transparent border-b-2 focus:outline-none text-white py-2  block w-64 appearance-none leading-normal font-bold`}
`

const PokeStat = styled.p`
  ${tw`text-white font-bold text-sm`}
`

const RegionText = styled.p`
  ${tw`text-white font-bold text-xl transform -rotate-90 absolute left-0 capitalize `}
  bottom: 15%;
`

const TypesWrapper=styled.div`
  ${tw`flex flex-row items-center`}
`

const TypeIcon = styled.img`
  ${tw`w-8 h-8 object-contain`}
`

interface IPokemon  {
  pokemon_id: number
  name: string
  front_default: string
  height: number
  weight: number
  base_experience: number
  baseHp: number
  baseAttack: number
  baseDefense: number
  baseSpecAttack: number
  baseSpecDefense: number
  baseSpeed: number
  jaName: string,
  pokemonType: string[],
  generationParam: number
}

const App: React.FC = () => {
  const [id, setId] = useState<number>(1)
  const [pokemon, setPokemon] = useState<IPokemon>({
      pokemon_id: 0,
      name: '',
      front_default: '',
      height: 0,
      weight: 0,
      base_experience: 0,
      baseHp: 0,
      baseAttack: 0,
      baseDefense: 0,
      baseSpecAttack: 0,
      baseSpecDefense: 0,
      baseSpeed: 0,
      jaName: '',
      pokemonType: [],
      generationParam: 1,
  })
  const [region, setRegion] = useState<string>('')

  const getPokemon = (id: number): void => {
    let fullData = `https://pokeapi.co/api/v2/pokemon/${id}/`
    let jaName = `https://pokeapi.co/api/v2/pokemon-species/${id}/`

    const requestOne = axios.get(fullData)
    const requestTwo = axios.get(jaName)

    axios
      .all([requestOne, requestTwo])
      .then(axios.spread((resOne, resTwo) => {
      // daj mi broj
      let {data: {id: pokemon_id }} = resOne
      // daj mi name 
      let { data: {name } } = resOne
      // daj mi sprite: moro sam koristit "" zbog offical-artwork
      let { "data": {"sprites": {"other": {"official-artwork": {front_default }}}}} = resOne
      // daj mi height
      let {data: {height}} = resOne
       // daj mi weight
       let {data: {weight}} = resOne
      // daj mi base_exp
      let {data: {base_experience }} = resOne
      //  daj mi hp base stat 
      let {stats: {0: {base_stat: baseHp}}} = resOne.data
      // daj mi base attack stat
      let {stats: {1: {base_stat: baseAttack}}} = resOne.data
      // daj mi base defense stat 
      let {stats: {2: {base_stat: baseDefense}}} = resOne.data
      // daj mi base special attack stat
      let {stats: {3: {base_stat: baseSpecAttack}}} = resOne.data
      // daj mi base special defense stat
      let {stats: {4: {base_stat: baseSpecDefense}}} = resOne.data
      // daj mi base speed stat
      let {stats: {5: {base_stat: baseSpeed}}} = resOne.data

      // daj mi types
      let types = resOne.data.types;
      let pokemonType:string[] = [];
      types.forEach((obj: any) => { pokemonType.push(obj.type.name) })

      // daj mi japansko ime
      let {names: {9: {name: jaName }}} = resTwo.data
      
      let {generation: {url: generationURL }} = resTwo.data
      let generationParamString = generationURL.substring(37,38);
      let generationParam = parseInt(generationParamString, 10)

      let responseObject = (() => ({pokemon_id, name, front_default, height, weight, base_experience, baseHp, baseAttack, baseDefense, baseSpecAttack, baseSpecDefense, baseSpeed, jaName, pokemonType, generationParam}))
      setPokemon(responseObject) 
      getRegion(generationParam)
    }))
  }


  const getRegion = (gen_id: number) => {
    let region = `https://pokeapi.co/api/v2/generation/${gen_id}/`

    axios
        .get(region)
        .then((resThree) => {
            // daj mi region name
            let {main_region: {name: regionName }} = resThree.data
            console.log(regionName)
            setRegion(regionName)
        })
    
  }

  // hook za lifeCycle componentWillMount
  useEffect(() => {
    getPokemon(1)
  }, [])

  const handleChange = (e: any) => {
    setId(e.target.value)
  }

  const handleSubmit = (e: any) => {
    e.preventDefault();
    getPokemon(id)
  }

  return (
    <Container>
      <Row>  
        {pokemon.pokemon_id < 10 ? <Number>{pokemon.pokemon_id >= 10  ? `${pokemon.pokemon_id}` : `00${pokemon.pokemon_id}`}</Number>  : <Number>{pokemon.pokemon_id >= 100  ? `${pokemon.pokemon_id}` : `0${pokemon.pokemon_id}`}</Number>  }  
        <Name>{pokemon.name}</Name>
      </Row>
      <Wrapper>
        <Row>
          {region ? <RegionText>Region: {region}</RegionText> : undefined}
          <JapanesseName>{pokemon.jaName}</JapanesseName>
          <PokemonImage src={pokemon.front_default} alt="Image of pokemon" />
          <TypesWrapper>
            {pokemon.pokemonType.map(type => {
                    let imgPath = `images/${type}.png`
                    return <TypeIcon key={type} src={imgPath} />
            })}
          </TypesWrapper>
          <PokeStat>Height: {pokemon.height / 10} m</PokeStat>
          <PokeStat>Weight: {pokemon.weight / 10} kg</PokeStat>
        </Row>
        <Row>
          <StatCard>{pokemon.baseHp} base hp</StatCard>
          <StatCard>{pokemon.baseAttack} base attack</StatCard>
          <StatCard>{pokemon.baseDefense} base defense</StatCard>
        </Row>
        <Row>
          <StatCard>{pokemon.baseSpeed} base speed</StatCard>
          <StatCard>{pokemon.baseSpecAttack} base sp.attack</StatCard>
          <StatCard>{pokemon.baseSpecDefense} base sp.defense</StatCard>
        </Row>
      </Wrapper>
      <Row>
        <PokeForm onSubmit={handleSubmit}>
          <PokeLabel>Enter a number</PokeLabel>
          <PokemonInput type="number" min="1" max="721" value={id} onChange={handleChange} />
        </PokeForm>
      </Row>
    </Container>
  );
};

export default App;