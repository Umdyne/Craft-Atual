<template>
  <v-app-bar color="cor_barra">
    <v-row class="justify-space-between">
      <!-- Botão de navegação, agora usando a foto de perfil -->
      <v-col cols="1">
        <v-btn :ripple="false" to="/home" variant="plain">
          <!-- Verificar se a foto existe antes de exibir -->
          <v-img src='/img/mini_logo.png' :width="70" aspect-ratio="1/1" class="rounded-circle" />
        </v-btn>
      </v-col>

      <!-- Campo de pesquisa -->
      <v-col cols="4">
        <v-text-field
          v-model="filtros.name"
          append-icon="mdi-magnify"
          label="O que você está buscando?"
          single-line
          hide-details
          @click:append="router.push({ path: '/search', query: { q: filtros.name } })"
          @keydown.enter="router.push({ path: '/search', query: { q: filtros.name } })"
          class="white--text"
        ></v-text-field>
      </v-col>

      <!-- Menu de usuário -->
      <v-col cols="1">
        <v-menu v-model="menu" :close-on-content-click="false" location="bottom">
          <template v-slot:activator="{ props }">
            <v-btn variant="plain" :ripple="false" size="x-large" color="indigo" v-bind="props">
              <!-- Usar a foto de perfil ou imagem padrão -->
              <v-img :src="usuario?.foto || '/img/perfil.png'" aspect-ratio="1/1" :width="70" class="rounded-circle" />
            </v-btn>
          </template>
          <v-card class="mt-2">
            <v-divider></v-divider>
            <v-list>
              <v-list-item>
                <v-btn to="/perfil" variant="text" prepend-icon="mdi-account">Perfil</v-btn>
              </v-list-item>
              <v-list-item>
                <v-btn @click="clearUserId" variant="text" prepend-icon="mdi-logout">Sair</v-btn>
              </v-list-item>
            </v-list>
          </v-card>
        </v-menu>
      </v-col>
    </v-row>
  </v-app-bar>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { useSupabase } from '~/composables/useSupabase';

const menu = ref(false);
const router = useRouter();
const filtros = ref({ name: '', categorie: null });
const usuario = ref(null); // Variável para armazenar os dados do usuário
const supabase = new useSupabase();

// Função para limpar o ID do usuário
function clearUserId() {
  localStorage.removeItem('userId');
  console.log('User ID removido do cache.');
  router.push('/login');
}

// Função para carregar os dados do usuário e a foto
onMounted(async () => {
  const userId = localStorage.getItem('userId');
  if (userId) {
    usuario.value = await supabase.getUsuario(userId);
    if (usuario.value && usuario.value.foto) {
      console.log('Foto de perfil carregada:', usuario.value.foto);
    } else {
      console.log('Foto não encontrada para o usuário.');
    }
  }
});
</script>
