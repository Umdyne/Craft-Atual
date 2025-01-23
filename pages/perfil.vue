<template>
    <v-app>
        <layout-default-header></layout-default-header>
        <!-- <pre>
            {{ lojas }}
        </pre> -->
        <v-main class="bg-cor_fundo ">
            <v-container class="justify-center  h-100">
                <layout-go-back></layout-go-back>
                <v-row v-if="usuario" class="justify-center ">
                    
                    <v-col class="justify-center d-flex" cols="12" md="3">

                    <div class="flex justify-center">
                        <v-img
                        :src="usuario.foto"
                        height="200"
                        width="200"
                        class="rounded-circle bg-white  mb-5"
                        aspect-ratio="1/1"
                        cover
                        >
                        
                    </v-img>

                        <p class="text-black text-center my-2 text-h5">
                            {{ usuario.name }}
                        </p>
                        
                        <v-btn to="/editar_perfil" color="cor_marron_claro my-5" class="mx-auto rounded-xl justify-center ml-5  elevation-10">
                            Editar Perfil
                        </v-btn>
                    </div>
                   
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
                    <v-row v-if="lojas" dense>
                        <v-col 
                        v-for="loja in lojas"
                        :key="loja.id"
                        cols="6"
                        md="3"
                        sm="4"
                        lg="2"
                        >
                        <v-btn :href="`/loja-${loja.id}`" class="rounded-circle" height="150" width="150">

                        
                        <v-card  class="rounded-circle ">
                            <v-img 
                            :src="loja.foto"
                            class="align-center "
                            gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
                            height="150px"
                            width="150px"
                            
                            cover
                            >
                            <v-card-title class=" text-center text-cor_fundo text-h5 mt-5 " v-text="loja.name"></v-card-title>
                            </v-img>

                
                        </v-card>
                         </v-btn>
                        </v-col>

                        <v-col 
                       
                        cols="6"
                        md="3"
                        sm="4"
                        lg="2"
                        >
                        <v-btn :href="`/add_loja`" class="rounded-circle" height="150" width="150">

                        
                        <v-card  class="rounded-circle ">
                            <v-img 
                            src="../img/add_loja.png"
                            class="align-center "
                            gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
                            height="150px"
                            width="150px"
                            
                            cover
                            >
                            
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
