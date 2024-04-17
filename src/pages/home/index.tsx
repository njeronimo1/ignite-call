import { Heading, Text } from '@ignite-ui/react'
import { Container, Hero, Preview } from './styles'
import Image from 'next/image'

import preview from '../../assets/preview.png'
import { ClaimUsernameForm } from './components/ClaimUsernameForm'

export default function Home() {
  return (
    <Container>
        <Hero>
            <Heading as="h1" size="4xl">Agendamento descomplicado</Heading>
            <Text size="xl">Conecte seu calendário e permita que as pessoas marquem agendamentos no seu tempo livre.</Text>

            <ClaimUsernameForm />
        </Hero>
        <Preview>
            <Image src={preview} alt='Calendário simbolizando aplicação em funcionamento' height={400} quality={100} priority/>
        </Preview>
    </Container>
  )
}
