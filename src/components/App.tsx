import React, { useState, useEffect } from 'react';
import axios from 'axios'
import styled from 'styled-components'

const Wrapper = styled.div `
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
`

const Row = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-around;
  position: relative
`

const Name = styled.h1`
  color: #fff;
  -webkit-text-fill-color: transparent;
  -webkit-text-stroke-width: 1px;
  -webkit-text-stroke-color: #fff;
  font-size: 110px;
  font-family: Noto Sans SC;
  font-weight: 800;
  text-transform: uppercase;
  margin: 0;
  padding: 0;
`

const Number = styled.p`
  color: #fff;
  -webkit-text-fill-color: transparent;
  -webkit-text-stroke-width: 1px;
  -webkit-text-stroke-color: #fff;
  font-size: 110px;
  font-family: Noto Sans SC;
  font-weight: 800;
  text-transform: uppercase;
  margin: 0;
  padding: 0;
`

const JapName = styled.h2`
  color: #fff;
  -webkit-text-fill-color: transparent;
  -webkit-text-stroke-width: 1px;
  -webkit-text-stroke-color: #fff;
  font-size: 80px;
  font-family: Noto Sans SC;
  position: absolute;
  top: 1%;
  left: 0;
  margin: .1em 0;
`

const ImageWrapper = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
`

const RegularStat = styled.p`
  color:#fff;
  font-family: Noto Sans SC;
  font-size: 16px;
`

const StatWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
  margin-bottom: 10em;
`

const StatText = styled.p`
  color: #fff;
  -webkit-text-fill-color: transparent;
  -webkit-text-stroke-width: 1px;
  -webkit-text-stroke-color: #fff;
  font-size: 24px;
  font-family: Noto Sans SC;
  text-transform: uppercase;
  margin: 0 1em;
`

const StatRow = styled.div `
  display: flex;
  flex-direction: column;
`
const TypeIcon = styled.img`
  width: 36px;
  height: 36px;
  margin: 0 .5em;
`

const PokeForm = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
`

const PokeInputText = styled.p`
  color: #fff;
  font-size: 16px;
`

const PokeInput= styled.input`
  background: transparent;
  border: none;
  border-bottom: 1px solid #fff;
  color: #fff;
  font-family: Noto Sans SC;
  outline: none;
  width: 250px;
  height: 50px;
`

const NameWrapepr = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  justify-content: center;
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
  pokemonType: string[]
}

const App: React.FC = () => {
  const [id, setId] = useState(0)
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
      pokemonType: []

  })

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

      let responseObject = (() => ({pokemon_id, name, front_default, height, weight, base_experience, baseHp, baseAttack, baseDefense, baseSpecAttack, baseSpecDefense, baseSpeed, jaName, pokemonType}))
      setPokemon(responseObject)  
    }))
    
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
    <Wrapper>
      <Row>
        <ImageWrapper>
          <JapName>{pokemon.jaName}</JapName>
          <img src={pokemon.front_default} alt="iamge of pokemon" />
        </ImageWrapper>
        <StatWrapper>
          <StatRow>
            <div>
              {pokemon.pokemonType.map(type => {
                  let imgPath = `images/${type}.png`
                  return <TypeIcon key={type} src={imgPath} />
              })}
            </div>
            <RegularStat>Height: {pokemon.height / 10} m</RegularStat>
            <RegularStat>Weight: {pokemon.weight / 10} kg</RegularStat>
          </StatRow>
          <StatRow>
            <StatText>{pokemon.baseHp} base hp</StatText>
            <StatText>{pokemon.baseAttack} base attack</StatText>
            <StatText>{pokemon.baseDefense} base defense</StatText>
          </StatRow>
          <StatRow>
          <StatText>{pokemon.baseSpecAttack} base sp.attack</StatText>
            <StatText>{pokemon.baseSpecDefense} base sp.defense</StatText>
            <StatText>{pokemon.baseSpeed} base speed</StatText>
          </StatRow>
        </StatWrapper>
      </Row>
      <Row>
        <PokeForm onSubmit={handleSubmit} >
          <PokeInputText>Enter a number: </PokeInputText>
          <PokeInput type="text" value={id} onChange={handleChange} />
        </PokeForm>
        <NameWrapepr>
          {pokemon.pokemon_id < 10 ? <Number>{pokemon.pokemon_id >= 10  ? `${pokemon.pokemon_id}` : `00${pokemon.pokemon_id}`}</Number>  : <Number>{pokemon.pokemon_id >= 100  ? `${pokemon.pokemon_id}` : `0${pokemon.pokemon_id}`}</Number>  }  
          <Name>{pokemon.name}</Name>
        </NameWrapepr>
      </Row>

    </Wrapper>
  );
};

export default App;