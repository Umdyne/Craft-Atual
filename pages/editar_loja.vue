<template>
    <v-app>
      <layout-default-header></layout-default-header>
      <v-main class="bg-cor_fundo">
        <v-container class="justify-center h-100">
          <v-btn href="/perfil" class="bg-transparent elevation-0">
            Voltar
          </v-btn>
          <p class="text-cor_mini_menu my-2 text-h4 text-center mb-8">EDITAR LOJA</p>
          <v-row class="justify-center rounded-xl bg-cor_card_login w-100">
            <v-col cols="3" class="justify-center">
              <v-btn height="200" width="200" class="rounded-circle">
                <v-img
                  src="/img/add_loja.png"
                  height="200"
                  width="200"
                  class="rounded-circle"
                  aspect-ratio="1/1"
                  cover
                ></v-img>
              </v-btn>
              <v-btn color="cor_marron_claro my-5 ml-2" class="rounded-xl elevation-10">
                Atualizar Perfil
              </v-btn>
            </v-col>
            <v-col cols="8">
              <v-text-field v-model="name" label="Nome da Loja" class="rounded-lg w-100"></v-text-field>
              <v-row class="mx-1">
                <v-autocomplete
                  class=""
                  item-value="id"
                  item-title="name"
                  ref="categoria"
                  v-model="selectedCategorie"
                  :items="categorie"
                  :rules="[() => !!selectedCategorie || 'Seleciona uma categoria']"
                  label="Categoria"
                  placeholder="Selecione..."
                  required
                ></v-autocomplete>
                <v-text-field v-model="contact" label="Contato" class="ml-3"></v-text-field>
              </v-row>
              <v-textarea
                v-model="description"
                label="Descrição"
                class="rounded-lg"
                rows="4"
                maxlength="290"
              ></v-textarea>
              <v-btn
                @click="atualizarLoja"
                class="justify-center bg-cor_marron_escuro rounded-xl w-75 ml-12 my-5"
                color="cor_fundo"
                variant="outlined"
              >
                ATUALIZAR
              </v-btn>
            </v-col>
          </v-row>
        </v-container>
      </v-main>
    </v-app>
  </template>
  
  <script setup lang="ts">
  import { ref, onMounted } from 'vue';
  import { useRouter } from 'vue-router';
  import { useSupabase } from '~/composables/useSupabase';
  
  const name = ref('');
  const description = ref('');
  const contact = ref('');
  const categorie = ref([]);
  const selectedCategorie = ref(null);
  const supabase = new useSupabase();
  const router = useRouter();
  const storeId = ref('');
  const userId = ref('');
  
  onMounted(async () => {
    const categorias = await supabase.getCategorias();
    if (categorias) {
      categorie.value = categorias;
    }
    const userIdStored = localStorage.getItem('userId');
    if (userIdStored) {
      userId.value = userIdStored;
    }
    // Carregar os dados da loja existente
    const storeData = await supabase.getStoreByUserId(userId.value);
    if (storeData) {
      storeId.value = storeData.id;
      name.value = storeData.name;
      selectedCategorie.value = storeData.categorie;
      contact.value = storeData.contact;
      description.value = storeData.description;
    }
  });
  
  async function atualizarLoja() {
    if (name.value && selectedCategorie.value && contact.value && description.value && userId.value && storeId.value) {
      const success = await supabase.updateStore(storeId.value, name.value, selectedCategorie.value, contact.value, description.value, userId.value);
      if (success) {
        router.push("/perfil");
      } else {
        console.error('Erro ao atualizar a loja');
      }
    } else {
      console.warn('Por favor, preencha todos os campos obrigatórios.');
    }
  }
  </script>
  