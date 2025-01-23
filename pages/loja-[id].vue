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

        <v-card class="mx-auto h-auto elevation-0 bg-cor_card_login border rounded-xl" max-width="1000">
          <v-container fluid>
            <v-row v-if="products" dense class=" h-100">
              <v-col v-for="product in products" :key="product.id" cols="12" md="4" sm="6" lg="4" class="">
                <store-product :loja="loja" :product="product">
                  <v-card class="rounded-xl elevation-2 card-hover">
                    <v-img 
                      :src="product.foto"
                      class="align-center"
                      gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
                      height="200px"
                      cover
                    ></v-img>
                    <v-card-title class="text-center text-cor_fundo text-h6 pa-3">
                      {{ product.name }}
                    </v-card-title>
                    <v-card-text class="text-center text-cor_barra truncate-text pa-3">
                      {{ product.description }}
                    </v-card-text>
                    <v-card-actions>
                      <v-btn block @click="abrirProduto(product)">Ver mais</v-btn>
                    </v-card-actions>
                  </v-card>
                </store-product>
              </v-col>
              <v-col cols="12" md="4" sm="6" lg="4">
                <v-btn class=" elevation-0" :ripple="false" href="/add_produto">
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
import { ref, computed, onMounted } from 'vue';

const route = useRoute();
const supabase = new useSupabase();
const loja = ref(null);
const products = ref([]);

onMounted(async () => {
  if (route.params.id) {
    loja.value = await supabase.getLoja(route.params.id);
    products.value = await supabase.getProdutos(route.params.id);
  }
});

function abrirProduto(product) {
  // Lógica para abrir o produto (exibir detalhes, redirecionar, etc.)
}

</script>

<style scoped>
.text-decoration-none {
  text-decoration: none;
}

.truncate-text {
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: normal;
}

.card-hover {
  transition: transform 0.3s ease;
}

.card-hover:hover {
  transform: scale(1.05);
}

.text-cor_barra {
  color: #333;
}

.text-cor_fundo {
  color: #fff;
}
</style>
