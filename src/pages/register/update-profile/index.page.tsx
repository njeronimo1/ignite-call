import { Avatar, Button, Heading, MultiStep, Text, TextArea, TextInput } from "@ignite-ui/react";
import { ArrowRight } from "phosphor-react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { api } from "@/lib/axios";
import { AxiosError } from "axios";
import { Container, Header } from "../styles";
import { FormAnnotation, ProfileBox } from "./styles";
import { useSession } from "next-auth/react";
import { GetServerSideProps } from "next";
import { buildNextAuthOptions } from "@/pages/api/auth/[...nextauth].api";
import { getServerSession } from "next-auth";

const updateProfileSchema = z.object({
    bio: z.string(),
})

type UpdateProfileData = z.infer<typeof updateProfileSchema>;

export default function UpdateProfile(){

    const {register, handleSubmit, setValue, formState: {errors, isSubmitting}} = useForm<UpdateProfileData>({
        resolver: zodResolver(updateProfileSchema)
    })

    const session = useSession();
    const router = useRouter();

    async function handleUpdateProfile(data: UpdateProfileData){
        await api.put('/users/profile', {
            bio: data.bio
        })

        await router.push(`/schedule/${session.data?.user.name}`);
    }

    return(
        <Container>
            <Header>
                <Heading as="strong" >
                    Bem-vindo ao Ignite Call!
                </Heading>
                <Text>
                    Precisamos de algumas informações para criar seu perfil! Ah, você pode editar essas informações depois.
                </Text>

                <MultiStep size={4} currentStep={4}/>
            </Header>

            <ProfileBox as="form" onSubmit={handleSubmit(handleUpdateProfile)}>
                <label>
                    <Text size="sm">Foto de perfil</Text>
                    <Avatar src={session.data?.user.avatar_url} alt={session.data?.user.name} />
                </label>

                <label>
                    <Text size="sm">Sobre você</Text>
                    <TextArea {...register('bio')} />
                    <FormAnnotation>
                        Fale um pouco sobre você. Isto será exibido em sua página pessoal.
                    </FormAnnotation>
                </label>

                <Button type="submit"> Finalizar <ArrowRight /></Button>
            </ProfileBox>
        </Container>
    )
}

export const getServerSideProps: GetServerSideProps = async ({ req, res}) => {
    const session = await getServerSession(req, res, buildNextAuthOptions(req, res));

    return {
        props: {
            session,
        }
    }
}