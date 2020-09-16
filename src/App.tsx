import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios'

import './assets/styles.css'


import { Container, Row, PokeForm, PokemonInput, PokeLabel } from './assets/styles'

import Pokemon from './components/Pokemon'


interface IPokemon {
  pokemon_id: number
  name: string
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
    pokemon_id: 1,
    name: '',
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

  // funkcija koja vraca objekat sa podacima o pokemnima uz pomoc destructuring-a
  const getPokemon = useCallback((id: number): void => {
    let fullData = `https://pokeapi.co/api/v2/pokemon/${id}/`
    let jaName = `https://pokeapi.co/api/v2/pokemon-species/${id}/`

    const requestOne = axios.get(fullData)
    const requestTwo = axios.get(jaName)

    axios
      .all([requestOne, requestTwo])
      .then(axios.spread((resOne, resTwo) => {
        // daj mi broj
        let { data: { id: pokemon_id } } = resOne
        // daj mi name 
        let { data: { name } } = resOne
        // daj mi height
        let { data: { height } } = resOne
        // daj mi weight
        let { data: { weight } } = resOne
        // daj mi base_exp
        let { data: { base_experience } } = resOne
        //  daj mi hp base stat 
        let { stats: { 0: { base_stat: baseHp } } } = resOne.data
        // daj mi base attack stat
        let { stats: { 1: { base_stat: baseAttack } } } = resOne.data
        // daj mi base defense stat 
        let { stats: { 2: { base_stat: baseDefense } } } = resOne.data
        // daj mi base special attack stat
        let { stats: { 3: { base_stat: baseSpecAttack } } } = resOne.data
        // daj mi base special defense stat
        let { stats: { 4: { base_stat: baseSpecDefense } } } = resOne.data
        // daj mi base speed stat
        let { stats: { 5: { base_stat: baseSpeed } } } = resOne.data

        // daj mi types
        let types = resOne.data.types;
        let pokemonType: string[] = [];
        types.forEach((obj: any) => { pokemonType.push(obj.type.name) })

        // daj mi japansko ime
        let { names: { 9: { name: jaName } } } = resTwo.data

        let { generation: { url: generationURL } } = resTwo.data
        let generationParamString = generationURL.substring(37, 38);
        let generationParam = parseInt(generationParamString, 10)

        let responseObject = (() => ({ pokemon_id, name, height, weight, base_experience, baseHp, baseAttack, baseDefense, baseSpecAttack, baseSpecDefense, baseSpeed, jaName, pokemonType, generationParam }))
        setPokemon(responseObject)
        getRegion(generationParam)
      }))
  }, [])


  const getRegion = (gen_id: number) => {
    let region = `https://pokeapi.co/api/v2/generation/${gen_id}/`

    axios
      .get(region)
      .then((resThree) => {
        // daj mi region name
        let { main_region: { name: regionName } } = resThree.data
        setRegion(regionName)
      })

  }

  // hook za lifeCycle componentWillMount
  useEffect(() => {
    getPokemon(1)
  }, [getPokemon])

  const handleChange = (e: any) => {
    setId(e.target.value)
  }

  const handleSubmit = (e: any) => {
    e.preventDefault();
    getPokemon(id)
  }

  return (
    <Container>
      <Pokemon
        pokemon_id={pokemon.pokemon_id}
        name={pokemon.name}
        height={pokemon.height}
        weight={pokemon.weight}
        base_experience={pokemon.base_experience}
        baseHp={pokemon.baseHp}
        baseAttack={pokemon.baseAttack}
        baseDefense={pokemon.baseDefense}
        baseSpecAttack={pokemon.baseSpecAttack}
        baseSpecDefense={pokemon.baseSpecDefense}
        baseSpeed={pokemon.baseSpeed}
        jaName={pokemon.jaName}
        pokemonType={pokemon.pokemonType}
        generationParam={pokemon.generationParam}
        region={region}
      />
      <Row>
        <PokeForm onSubmit={handleSubmit}>
          <PokeLabel>Enter a number</PokeLabel>
          <PokemonInput type="number" min="1" max="802" value={id} onChange={handleChange} />
        </PokeForm>
      </Row>
    </Container>
  );
};

export default App;