import React from 'react'
import { Container, Wrapper, Row, Number, Name, JapanesseName, PokemonImage, StatCard, PokeStat, RegionText, TypesWrapper, TypeIcon } from '../assets/styles'


interface PropsPokemon {
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
    pokemonType: string[]
    generationParam: number
    region: string
}


const Pokemon: React.FC<PropsPokemon> = ({ pokemon_id, name, height, weight, base_experience, baseHp, baseAttack, baseDefense, baseSpecAttack, baseSpecDefense, baseSpeed, jaName, pokemonType, generationParam, region }) => {
    return (
        <Container>
            <Row>
                {pokemon_id < 10 ? <Number>{pokemon_id >= 10 ? `${pokemon_id}` : `00${pokemon_id}`}</Number> : <Number>{pokemon_id >= 100 ? `${pokemon_id}` : `0${pokemon_id}`}</Number>}
                <Name>{name}</Name>
            </Row>
            <Wrapper>
                <Row>
                    {region ? <RegionText>Region: {region}</RegionText> : undefined}
                    <JapanesseName>{jaName}</JapanesseName>
                    {pokemon_id < 10 ? <PokemonImage src={pokemon_id >= 10 ? `https://assets.pokemon.com/assets/cms2/img/pokedex/full/${pokemon_id}.png` : `https://assets.pokemon.com/assets/cms2/img/pokedex/full/00${pokemon_id}.png`} /> : <PokemonImage src={pokemon_id >= 100 ? `https://assets.pokemon.com/assets/cms2/img/pokedex/full/${pokemon_id}.png` : `https://assets.pokemon.com/assets/cms2/img/pokedex/full/0${pokemon_id}.png`} />}
                    <TypesWrapper>
                        {pokemonType.map(type => {
                            let imgPath = `images/${type}.png`
                            return <TypeIcon key={type} src={imgPath} />
                        })}
                    </TypesWrapper>
                    <PokeStat>Height: {height / 10} m</PokeStat>
                    <PokeStat>Weight: {weight / 10} kg</PokeStat>
                </Row>
                <Row>
                    <StatCard>{baseHp} base hp</StatCard>
                    <StatCard>{baseAttack} base attack</StatCard>
                    <StatCard>{baseDefense} base defense</StatCard>
                </Row>
                <Row>
                    <StatCard>{baseSpeed} base speed</StatCard>
                    <StatCard>{baseSpecAttack} base sp.attack</StatCard>
                    <StatCard>{baseSpecDefense} base sp.defense</StatCard>
                </Row>
            </Wrapper>
        </Container>
    )
}

export default Pokemon
