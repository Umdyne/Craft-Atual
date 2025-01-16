<template>
    <v-app>
      <layout-default-header></layout-default-header>
      <v-main class="bg-cor_fundo">
        <v-container class="justify-center h-100">
         
         <layout-go-back></layout-go-back>
          <v-row class="justify-center mt-5" v-if="loja">
            <v-col cols="3">
              <v-img
                :src="loja.foto"
                max-height="200"
                max-width="200"
                class="rounded-circle ml-n5 mb-5"
                aspect-ratio="1/1"
                cover
              ></v-img>
              
            </v-col>
            <v-col cols="9">
              <p class="text-black text-h3">{{ loja.name }}</p>
              <p class="text-black text-h5 mb-5">{{ loja.description }}</p>
              
              <p class="text-black mt-5 text-h6">{{ loja.contact }}</p>
              <p class="text-black text-h6">{{ loja.location }}</p>
              
              <p class="">Artista:  </p>
              <p class="font-weight-bold mt-n1">{{ loja.socialWeb }}</p>

              <v-btn class="bg-transparent mx-n5 elevation-0">
                Editar Loja
              </v-btn>
            </v-col>
          </v-row>
          <v-row class="justify-center mb-10" v-if="loja">
            <v-card class="bg-cor_card_login rounded-xl" height="150" width="700">
              <v-card-title class="text-center text-cor_fundo">
                Sobre mim
              </v-card-title>
              <v-card
                class="bg-cor_card_login mx-5  elevation-0"
                v-text="loja.aboutMe"
              ></v-card>
            </v-card>
          </v-row>
  
          <v-card class="mx-auto h-auto  bg-black elevation-0" max-width="1000">
            <v-container fluid>
              <v-row v-if="products" dense class="bg-red h-100">
                <v-col v-for="product in products" :key="product.id" cols="12"
                        md="4"
                        sm="6"
                        lg="4"
                        class="bg-green">
                  
                  <store-product :loja="loja" :product="product"> 
                    <v-btn class=" w-100 h-100  bg-blue" >
                    <v-card class="rounded-sm">
                      <img
                        :src="product.foto"
                        class="align-center bg-gray" 
                        width="100%"
                        cover
                      />
                       
                      
                      <v-card-title
                          class="text-center text-cor_fundo text-h5 mt-5"
                          v-text="product.nome"
                        ></v-card-title>
                    </v-card>
                  </v-btn>
                  
                  </store-product>
                </v-col>
                <v-col  cols="12"
                        md="4"
                        sm="6"
                        lg="4">
                  <v-btn class="bg-black elevation-0 " :ripple="false" href="/add_produto">

                    <img
                        src="../img/add_loja.png"
                        class="align-center"
                        width="100%"
                        cover
                        
                      />
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
  import { useRoute } from 'vue-router';
  import { ref, computed } from 'vue';
  
  const route = useRoute();
  const supabase = new useSupabase();
  const loja = ref();
  const products = ref();

  onMounted(async () => {

        if (route.params.id) {
            loja.value = await supabase.getLoja(route.params.id);
            products.value = await supabase.getProdutos(route.params.id);

        }
    });

 
  
  </script>
  
  <style scoped>
  .text-decoration-none {
    text-decoration: none;
  }
  </style>
  