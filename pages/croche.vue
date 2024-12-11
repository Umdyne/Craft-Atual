<template>
    <v-app>
      <v-app-bar color="cor_barra">
        <v-row class="justify-space-between">
          <v-col cols="1">
            <router-link to="/" class="text-decoration-none">
              <v-img src="/img/mini_logo.png" :width="70" />
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
              <v-img src="/img/perfil.png" :width="70" />
            </router-link>
          </v-col>
        </v-row>
      </v-app-bar>
      <v-main class="bg-cor_fundo">
        <v-container class="justify-center h-100">
          <router-link to="/" class="text-decoration-none">
            <v-btn class="bg-transparent elevation-0">Voltar</v-btn>
          </router-link>
          <v-row class="justify-center">
            <v-col cols="6">
              <v-img
                src="/img/img-1.png"
                height="250"
                width="500"
                class="rounded-xl ml-n5 mb-5 align-center text-center"
                cover
              >
                <p class="text-cor_fundo my-2 text-h2 align-center">CROCHÊ</p>
              </v-img>
            </v-col>
          </v-row>
  
          <v-card class="mx-auto bg-transparent elevation-0" max-width="1000">
            <v-container fluid>
              <v-row dense>
                <v-col v-for="card in cards" :key="card.id" :cols="2">
                  <router-link
                    :to="`/lojas/${normalizeLojaNome(card.nome)}`"
                    class="text-decoration-none"
                  >
                    <v-btn
                      class="rounded-circle bg-transparent elevation-0"
                      height="180"
                      width="150"
                    >
                      <v-card class="bg-transparent elevation-0">
                        <v-img
                          :src="card.foto"
                          class="align-center rounded-circle"
                          gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
                          height="150px"
                          width="150px"
                          cover
                        ></v-img>
                        <v-card-title
                          class="text-center text-black text-body-2"
                          v-text="card.nome"
                        ></v-card-title>
                      </v-card>
                    </v-btn>
                  </router-link>
                </v-col>
              </v-row>
            </v-container>
          </v-card>
          <v-divider
            :thickness="3"
            class="border-opacity-50 mt-15 mb-8"
            color="black"
          ></v-divider>
        </v-container>
      </v-main>
    </v-app>
  </template>
  
  <script>
  import { ref, onMounted } from 'vue';
  
  export default {
    setup() {
      const cards = ref([]);
  
      const fetchLojas = async () => {
        try {
          const response = await fetch('http://localhost:3001/loja');
          if (!response.ok) {
            throw new Error('Erro na requisição');
          }
          const data = await response.json();
          cards.value = data;
        } catch (error) {
          console.error('Erro ao buscar lojas:', error);
        }
      };
  
      const normalizeLojaNome = (nome) => {
        return nome
          .normalize('NFD')
          .replace(/[\u0300-\u036f]/g, '') // Remove acentos
          .replace(/\s+/g, '-') // Substitui espaços por hifens
          .toLowerCase(); // Transforma em minúsculas
      };
  
      onMounted(() => {
        fetchLojas();
      });
  
      return {
        cards,
        normalizeLojaNome,
      };
    },
  };
  </script>
  
  <style scoped>
  .text-decoration-none {
    text-decoration: none;
  }
  </style>
  