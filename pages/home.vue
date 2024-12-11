<template>
    <v-app>
      <layout-default-header></layout-default-header>
      <v-main class="bg-cor_fundo">
        <v-container>
          <p class="text-cor_barra text-center text-h5">EXPLORE</p>
          <v-card class="mx-auto bg-transparent elevation-0" max-width="1000">
            <v-container fluid>
              <v-row dense>
                <v-col
                  cols="4"
                  v-for="card in categorias"
                  :key="card.id"
                  :cols="card.flex"
                >
                  <router-link :to="`/${normalizeCategoria(card.nome)}`" class="text-decoration-none">
                    <v-card class="rounded-xl card-hover">
                      <v-img
                        :src="card.foto"
                        class="align-end"
                        gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
                        height="200px"
                        cover
                      >
                        <v-card-title class="text-center text-cor_fundo text-h5">
                          {{ card.nome }}
                        </v-card-title>
                      </v-img>
                    </v-card>
                  </router-link>
                </v-col>
              </v-row>
            </v-container>
          </v-card>
          <!--  -->
          <!--  -->
          
        </v-container>
      </v-main>
    </v-app>
  </template>
  
  <script setup>
  import { ref, onMounted } from 'vue';
  
  const menu = ref(false);
  const router = useRouter();
  const categorias = ref([]);
  
  const fetchCategorias = async () => {
    try {
      const response = await fetch('http://localhost:3001/categoria');
      if (!response.ok) {
        throw new Error('Erro na requisição');
      }
      const data = await response.json();
      categorias.value = data;
    } catch (error) {
      console.error('Erro ao buscar categorias:', error);
    }
  };
  
  const normalizeCategoria = (categoria) => {
    // Função para remover acentos e transformar em minúsculas
    return categoria
      .normalize('NFD') // Descompõe caracteres acentuados
      .replace(/[\u0300-\u036f]/g, '') // Remove os diacríticos
      .toLowerCase(); // Transforma em minúsculas
  };
  
  onMounted(() => {
    fetchCategorias();
  });

  function clearUserId() {
  localStorage.removeItem('userId');
  console.log('User ID removido do cache.');
  router.push('/login');}

  </script>
  
  <style scoped>
  .card-hover {
    transition: transform 0.3s ease;
  }
  
  .card-hover:hover {
    transform: scale(1.05);
  }
  
  .text-decoration-none {
    text-decoration: none;
  }
  </style>
  