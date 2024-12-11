<template>
    <v-app>
      <v-app-bar color="cor_barra">
        <v-row class="justify-space-between">
          <v-col cols="1">
            <router-link to="/" class="text-decoration-none">
              <v-img src="/img/mini_logo.png" :width="70"></v-img>
            </router-link>
          </v-col>
          <v-col cols="4">
            <v-text-field
              v-model="search"
              append-icon="mdi-magnify"
              label="O que você está buscando?"
              single-line
              hide-details
              @click:append="executeSearch"
              class="white--text"
            ></v-text-field>
          </v-col>
          <v-col cols="1">
            <router-link to="/login" class="text-decoration-none">
              <v-img src="/img/perfil.png" :width="70"></v-img>
            </router-link>
          </v-col>
        </v-row>
      </v-app-bar>
      <v-main class="bg-cor_fundo">
        <v-container class="justify-center h-100">
          <v-btn class="bg-transparent elevation-0">Voltar</v-btn>
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
              <v-img src="/img/star.png" width="200" class="ml-n6"></v-img>
            </v-col>
            <v-col cols="9">
              <p class="text-black my-2 text-h3">{{ loja.nome }}</p>
              <p class="text-black my-2 text-h5">{{ loja.descricao }}</p>
              <p v-html="formattedDescricao"></p>
              <p>•Contato: 00 0000-0000</p>
              <p>•Picos-PI</p>
              <p class="font-weight-bold my-3">Artista: @perfilArtista </p>
            </v-col>
          </v-row>
          <v-row class="justify-center mb-10" v-if="loja">
            <v-card class="bg-cor_card_login rounded-xl" height="150" width="700">
              <v-card-title class="text-center text-cor_fundo">
                Sobre mim
              </v-card-title>
              <v-card
                class="bg-cor_card_login text-h3 elevation-0"
                v-text="loja.sobre_mim"
              ></v-card>
            </v-card>
          </v-row>
  
          <v-card class="mx-auto bg-transparent elevation-0" max-width="1000">
            <v-container fluid>
              <v-row dense>
                <v-col v-for="product in products" :key="product.id" cols="4">
                  <v-btn class="my-2 mx-n2" height="300" width="300">
                    <v-card class="rounded-sm">
                      <v-img
                        :src="product.foto"
                        class="align-center"
                        height="300"
                        width="300"
                        cover
                      >
                        <v-card-title
                          class="text-center text-cor_fundo text-h5 mt-5"
                          v-text="product.nome"
                        ></v-card-title>
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
  
  <script>
  import { ref, onMounted, computed } from 'vue';
  
  export default {
    setup() {
      const loja = ref(null);
      const products = ref([]);
  
      const fetchLojas = async () => {
        try {
          const response = await fetch('http://localhost:3001/loja');
          if (!response.ok) {
            throw new Error('Erro na requisição');
          }
          const data = await response.json();
          if (data.length > 0) {
            loja.value = {
              nome: data[0].nome,
              foto: data[0].fotos,
              descricao: data[0].descricao,
              sobre_mim: data[0].sobre_mim,
            };
          }
        } catch (error) {
          console.error('Erro ao buscar dados da loja:', error);
        }
      };
  
      const fetchProdutos = async () => {
        try {
          const response = await fetch('http://localhost:3001/produto');
          if (!response.ok) {
            throw new Error('Erro na requisição');
          }
          const data = await response.json();
          products.value = data.map(product => ({
            id: product.id,
            nome: product.nome,
            foto: product.foto,
          }));
        } catch (error) {
          console.error('Erro ao buscar produtos:', error);
        }
      };
  
      const formattedDescricao = computed(() => {
        if (loja.value && loja.value.descricao) {
          return loja.value.descricao.replace(/•/g, '<br>•');
        }
        return '';
      });
  
      onMounted(() => {
        fetchLojas();
        fetchProdutos();
      });
  
      return {
        loja,
        products,
        formattedDescricao,
      };
    },
  };
  </script>
  
  <style scoped>
  .text-decoration-none {
    text-decoration: none;
  }
  </style>
  