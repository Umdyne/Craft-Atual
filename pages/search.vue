<template>
    <v-app class="bg-cor_fundo">
      <layout-default-header></layout-default-header>
      <v-main class="bg-cor_fundo">
        <v-container>
          <p class="text-cor_barra text-center text-h5 mb-4">Buscar Produtos e Lojas</p>
  
          <!-- Formulário de Filtros -->
          <v-card class="p-4 mb-6 bg-transparent flat elevation-0">
            <v-row dense>
              <!-- Campo de Nome -->
              <v-col cols="12" md="6" sm="12">
                <v-text-field
                  v-model="filtros.name"
                  label="Nome do Produto ou Loja"
                  clearable
                  dense
                  outlined
                  @keydown.enter="buscar"
                ></v-text-field>
              </v-col>
  
              <!-- Seleção de Categoria -->
              <v-col cols="12" md="6" sm="12">
                <v-select
                  v-model="filtros.categorie"
                  :items="categorias"
                  label="Categoria"
                  item-text="name"
                  item-value="id"
                  item-title="name"
                  dense
                  outlined
                  clearable
                ></v-select>
              </v-col>
            </v-row>
  
            <!-- Botão de Busca -->
            <v-row>
              <v-col cols="12" class="text-center">
                <v-btn color="cor_barra" large @click="buscar">Buscar</v-btn>
              </v-col>
            </v-row>
          </v-card>
  
          <!-- Lista de Produtos -->
          <v-card
            v-if="produtos.length > 0"
            class="bg-cor_marron_claro rounded-xl elevation-0 mb-6"
          >
            <v-container fluid>
              <v-row dense>
                <v-col cols="12" sm="6" md="4" lg="3" v-for="produto in produtos" :key="produto.id">
                  <v-card
                    class="rounded-xl elevation-2 card-hover"
                    max-width="300px"
                    outlined
                  >
                    <v-img
                      :src="produto?.foto"
                      class="align-end"
                      gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
                      height="200px"
                      cover
                    >
                      <v-card-title class="text-center text-cor_fundo text-h6">
                        {{ produto?.name }}
                      </v-card-title>
                    </v-img>
                    <v-card-text class="text-center text-cor_barra truncate-text pa-3">
                      {{ produto?.description }}
                    </v-card-text>
                    <v-card-actions>
                      <v-btn block @click="abrirProduto(produto)">Ver mais</v-btn>
                    </v-card-actions>
                  </v-card>
                </v-col>
              </v-row>
            </v-container>
          </v-card>
  
          <!-- Lista de Lojas -->
          <v-card
            v-if="lojas.length > 0"
            class="bg-cor_marron_claro rounded-xl elevation-0"
          >
            <v-container fluid>
              <v-row dense>
                <v-col cols="12" sm="6" md="4" lg="3" v-for="loja in lojas" :key="loja.id">
                  <v-card
                    class="rounded-xl elevation-2 card-hover"
                    max-width="300px"
                    outlined
                  >
                    <v-card-title class="text-center text-cor_fundo text-h6 pa-3">
                      {{ loja?.name }}
                    </v-card-title>
                    <v-card-text class="text-center text-cor_barra truncate-text pa-3">
                      {{ loja?.description }}
                    </v-card-text>
                    <v-card-actions>
                      <v-btn block @click="abrirLoja(loja.id)">Visitar Loja</v-btn>
                    </v-card-actions>
                  </v-card>
                </v-col>
              </v-row>
            </v-container>
          </v-card>
  
          <!-- Mensagem de Nenhum Resultado Encontrado -->
          <div v-else class="text-center mt-4">
            <p class="text-cor_barra text-h6">Nenhum resultado encontrado.</p>
          </div>
  
          <!-- Dialog para Exibir Produto -->
          <v-dialog v-model="dialog" max-width="800">
            <v-card>
              <v-row no-gutters class="w-100 h-100">
                <v-col cols="6" class="d-flex align-center justify-center">
                  <v-img :src="produtoSelecionado?.foto" height="470" cover />
                </v-col>
                <v-col cols="6" class="d-flex align-center justify-center">
                  <v-card class="justify-center" height="100%" width="100%">
                    <v-card-text class="text-h6 font-weight-light flex align-end">
                      {{ produtoSelecionado?.loja.name }}
                    </v-card-text>
                    <v-card-text class="text-h6 font-weight-light flex align-end">
                      {{ produtoSelecionado?.name }}
                    </v-card-text>
                    <v-card-text class="text-h7 font-weight-light flex align-end">
                      Descrição: {{ produtoSelecionado?.description }}
                    </v-card-text>
                    <p class="ma-5 font-weight-medium">Valor: R$ {{ produtoSelecionado?.valor }}</p>
                    <v-btn icon="mdi-trash-can" class="lixo-btn" color="cor_fundo">
                      
                    </v-btn>
                  </v-card>
                </v-col>
              </v-row>
            </v-card>
          </v-dialog>
        </v-container>
      </v-main>
    </v-app>
  </template>
  
  <script setup lang="ts">
  import { ref, onMounted } from 'vue';
  import { useSupabase } from '~/composables/useSupabase';
  import { useRouter, useRoute } from 'vue-router';
  
  interface Produto {
    id: string;
    name: string;
    foto: string;
    description: string;
    valor: number;
    loja: {
      name: string;
    };
  }
  
  // Instância do Supabase e Router
  const supabase = new useSupabase();
  const router = useRouter();
  const route = useRoute();
  
  // Variáveis reativas
  const produtos = ref([]);
  const lojas = ref([]);
  const filtros = ref({ name: route.query.q || '', categorie: null });
  const categorias = ref([]);
  const dialog = ref(false);
  const produtoSelecionado = ref<Produto | null>(null);
  
  // Função para buscar produtos e lojas
  async function buscar() {
    try {
      const produtosResult = await supabase.searchProdutos(filtros.value);
      produtos.value = produtosResult || [];
      const lojasResult = await supabase.searchLojas(filtros.value);
      lojas.value = lojasResult || [];
    } catch (error) {
      console.error('Erro ao buscar produtos e lojas:', error);
    }
  }
  
  // Função para abrir o diálogo do produto
  function abrirProduto(produto: Produto) {
    produtoSelecionado.value = produto;
    dialog.value = true;
  }
  
  // Função para abrir a página da loja
  function abrirLoja(lojaId: string) {
    router.push({ path: `/loja-${lojaId}` });
  }
  
  // Carregar categorias ao montar o componente
  onMounted(async () => {
    try {
      const categoriasData = await supabase.getCategorias();
      categorias.value = categoriasData || [];
    } catch (error) {
      console.error('Erro ao carregar categorias:', error);
    }
  
    if (route.query.q) {
      await buscar();
    }
  });
  </script>
  
  <style scoped>
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
  
  .lixo-btn {
    position: absolute;
    bottom: 16px;
    right: 16px;
  }
  </style>
  