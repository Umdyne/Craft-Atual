<template>
    <v-app>
      <layout-default-header></layout-default-header>
      <v-main class="bg-cor_fundo">
        <v-container class="justify-center h-100">
          <v-btn @click="voltar" class="bg-transparent elevation-0">
            Voltar
          </v-btn>
          <p class="text-cor_mini_menu my-2 text-h4 text-center mb-8">
            ADICIONAR PRODUTO
          </p>
          <v-row class="justify-center rounded-xl bg-cor_card_login w-100">
            <v-col cols="3" class="justify-center">
              <v-btn height="200" width="200" class="rounded-circle">
                <v-img
                  src="/img/add_produto.png"
                  height="200"
                  width="200"
                  class="rounded-circle"
                  aspect-ratio="1/1"
                  cover
                ></v-img>
              </v-btn>
              <v-btn
                color="cor_marron_claro my-5 ml-2"
                class="rounded-xl elevation-10"
              >
                Adicionar Imagem
              </v-btn>
            </v-col>
            <v-col cols="8">
              <v-text-field
                v-model="name"
                label="Nome do Produto"
                class="rounded-lg w-100"
              ></v-text-field>
              <v-text-field
                v-model="price"
                label="Preço"
                class="rounded-lg w-100"
              ></v-text-field>
              <v-textarea
                v-model="description"
                label="Descrição"
                class="rounded-lg"
                rows="4"
                multiline
                maxlength="290"
              ></v-textarea>
              <v-btn
                @click="cadastrarProduto"
                class="justify-center bg-cor_marron_escuro rounded-xl w-75 ml-12 my-5"
                color="cor_fundo"
                variant="outlined"
              >
                CADASTRAR 2
              </v-btn>
            </v-col>
          </v-row>
        </v-container>
      </v-main>
    </v-app>
  </template>
  
  <script setup lang="ts">
  import { ref, onMounted } from 'vue';
  import { useRouter, useRoute } from 'vue-router';
  import { useSupabase } from '~/composables/useSupabase';
  
  const name = ref('');
  const price = ref('');
  const description = ref('');
  const supabase = new useSupabase();
  const router = useRouter();
  const route = useRoute();
  const lojaId = ref(route.params.loja);
  

  
  // Função para cadastrar o produto vinculado à loja
  async function cadastrarProduto() {
    console.log(name.value , price.value , description.value , lojaId.value);
    if (name.value && price.value && description.value && lojaId.value) {
      const success = await supabase.createProduct(name.value, price.value, description.value, lojaId.value);
      if (success) {
        router.push(`/loja-${lojaId.value}`); // Redirecionar para a página da loja após cadastrar o produto
      } else {
        console.error('Erro ao criar o produto');
      }
    } else {
      console.warn('Por favor, preencha todos os campos obrigatórios.');
    }
  }
  
  // Função para voltar à página anterior
  function voltar() {
    router.back();
  }
  </script>
  