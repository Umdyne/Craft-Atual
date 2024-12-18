<template>
    <v-app>
        <layout-default-header></layout-default-header>
        <v-main class="bg-cor_fundo">
            <v-container class="justify-center  h-100">
                
                <layout-go-back></layout-go-back>
                <v-row class="justify-center ">
                    <v-col cols="6">

                
                        <v-img
                            src="/img/img-1.png"
                            height="250"
                        ></v-img>
                        
                
                    </v-col>
                </v-row>
                

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
                        <v-btn class="rounded-circle bg-transparent elevation-0" height="180" width="150">

                        
                        <v-card class="bg-transparent elevation-0"  >
                            <v-img 
                            :src="card.src"
                            class="align-center  rounded-circle"
                            gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
                            height="150px"
                            width="150px"
                            
                            cover
                            >
                            
                            </v-img>
                            <v-card-title class=" text-center text-black text-body-2  "  v-text="card.title"></v-card-title>
                
                        </v-card>
                    </v-btn>
                        </v-col>
                    </v-row>
                    </v-container>
                </v-card>
                <v-divider
                    :thickness="3"
                    class="border-opacity-50 mt-15 mb-8"
                    color="black"
                ></v-divider>
                    <v-container fluid>
                    <v-row v-if="lojas" dense>
                        <v-col 
                        v-for="loja in lojas"
                        :key="loja.id"
                        cols="2"
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
                    </v-row>
                    </v-container>
            </v-container>

        </v-main>
        
    </v-app>
</template>

<script setup lang="ts">
    import { useSupabase } from '~/composables/useSupabase';
    import { useRoute } from 'vue-router';

    const supabase = new useSupabase();
    const lojas = ref();
    const categoria = ref();
    const route = useRoute();
    onMounted(async () => {

        if (route.params.uuid) {
            
            lojas.value = await supabase.getLojasC(route.params.uuid);
            
            console.log("oi",lojas.value);


        }
    });



</script>
