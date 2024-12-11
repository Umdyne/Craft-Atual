<template>
    <v-app>
        <layout-default-header></layout-default-header>
        <pre>{{ usuario }}
            {{ lojas }}
        </pre>
        <v-main class="bg-cor_fundo">
            <v-container class="justify-center  h-100">
                <v-btn class="bg-transparent elevation-0">
                    Voltar
                </v-btn>
                <v-row class="justify-center ">
                    <v-col cols="3">

                    
                    <v-img
                        src="/img/girl.jpeg"
                        max-height="200"
                        max-width="200"
                        class="rounded-circle ml-n5 mb-5"
                        aspect-ratio="1/1"
                        cover
                        >
                        
                    </v-img>

                        <p class="text-black my-2 text-h5">
                        Nome_Usuário
                        </p>
                        <v-btn color="cor_marron_claro my-5" class="rounded-xl elevation-10">
                            Editar Perfil
                    </v-btn>
                    </v-col>
                </v-row>
                <v-divider
                    :thickness="3"
                    class="border-opacity-50 mt-15 mb-8"
                    color="black"
                    ></v-divider>
                <p class="text-cor_barra text-center text-h5 ml-n15 mr-15">
                MINHAS LOJAS
                </p>

                <v-card
                    class="mx-auto bg-transparent elevation-0 "
                    max-width="1000"
                >
                    <v-container fluid>
                    <v-row dense>
                        <v-col
                        v-for="card in cards"
                        :key="card.title"
                        :cols="card.flex"
                        >
                        <v-btn class="rounded-circle" height="150" width="150">

                        
                        <v-card class="rounded-circle ">
                            <v-img 
                            :src="card.src"
                            class="align-center "
                            gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
                            height="150px"
                            width="150px"
                            
                            cover
                            >
                            <v-card-title class=" text-center text-cor_fundo text-h5 mt-5 " v-text="card.title"></v-card-title>
                            </v-img>

                
                        </v-card>
                    </v-btn>
                        </v-col>
                    </v-row>
                    </v-container>
                </v-card>
            </v-container>

        </v-main>
    </v-app>
</template>

<script setup lang="ts">
    import { useSupabase } from '~/composables/useSupabase';

    const usuario = ref();
    const userId = ref();
    const lojas = ref();

    const supabase = new useSupabase();

    onMounted(async () => {
        userId.value = localStorage.getItem('userId');

        if (userId.value) {
            usuario.value = await supabase.getUsuario(userId.value);
            lojas.value = await supabase.getLojas(userId.value);
            console.log('Dados do usuário:', usuario.value);
        }
    });



</script>
