import styled from "styled-components"
import tw from "twin.macro"

export const Container = styled.div`
  ${tw`container bg-transparent p-0 mx-auto my-0`}
`

export const Wrapper = styled.div`
  ${tw`flex flex-col md:flex-row justify-around items-center`}
`

export const Row = styled.div`
  ${tw`flex flex-col justify-start items-center my-3`}
`
export const Number = styled.p`
  ${tw`text-2xl text-white font-black`}
`

export const Name = styled.h1`
  ${tw`text-2xl text-white font-black uppercase`}
`

export const JapanesseName = styled.h2`
  ${tw`text-6xl text-white font-black uppercase`}
`

export const PokemonImage = styled.img`
  object-fit: contain;
  height: 18rem;
`

export const StatCard = styled.span`
  ${tw`inline-block bg-gray-200 rounded-lg px-5 py-2 text-sm font-semibold text-gray-700 my-2 uppercase`}
`

export const PokeForm = styled.form`
  ${tw`px-8 pt-6 pb-8 mb-4`}
`

export const PokeLabel = styled.label`
  ${tw`block text-white text-sm font-bold mb-2`}
`

export const PokeStat = styled.p`
  ${tw`text-white font-bold text-sm`}
`

export const RegionText = styled.p`
  ${tw`text-white font-bold text-xl transform -rotate-90 absolute left-0 capitalize `}
  bottom: 15%;
`

export const TypesWrapper = styled.div`
  ${tw`flex flex-row items-center`}
`

export const TypeIcon = styled.img`
  ${tw`w-8 h-8 object-contain`}
`

export const PokemonInput = styled.input`
  ${tw`bg-transparent border-b-2 focus:outline-none text-white py-2  block w-64 appearance-none leading-normal font-bold`}
`