<template>
    <v-app class="bg-cor_fundo">
      <layout-default-header></layout-default-header>
      <v-main class="bg-cor_fundo">
        <v-container fluid fill-height class="d-flex justify-center align-center h-100">
          <v-card class="d-flex align-center justify-center flat elevation-0" width="60vw">
            <v-row no-gutters class="w-100 h-100">
              <v-col cols="12" md="6" class="d-flex align-center justify-center bg-cor_fundo flat elevation-0">
                <div class="d-flex flex-column align-center justify-center">
                  <v-img
                    :src="usuario.foto || '/img/perfil.png'"
                    height="400"
                    width="400"
                    class="rounded-lg mb-3"
                    aspect-ratio="1/1"
                    cover
                  ></v-img>
                  <v-btn @click="selectProfilePicture" class="rounded-circle elevation-1">
                    <v-icon>mdi-camera</v-icon> Mudar Foto de Perfil
                  </v-btn>
                  <input type="file" ref="fileInput" @change="uploadProfilePicture" accept="image/*" class="d-none" />
                </div>
              </v-col>
              <v-col cols="12" md="6" class="d-flex align-center justify-center">
                <v-card class="bg-cor_card_login justify-center" height="100%" width="100%">
                  <v-btn class="bg-transparent elevation-0" href="/login">
                    Voltar
                  </v-btn>
                  <v-card-text class="text-center text-h5 font-weight-light mt-5">
                    Editar Perfil
                  </v-card-text>
                  <v-text-field v-model="name" label="Name" class="mx-5 rounded-lg"></v-text-field>
                  <v-text-field v-model="username" label="Username" class="mx-5 rounded-lg"></v-text-field>
                  <v-text-field
                    v-model="email"
                    label="Email"
                    class="mx-5 rounded-lg"
                    :rules="[validateEmail]"
                  ></v-text-field>
                  <v-text-field
                    v-model="password"
                    type="password"
                    label="Password"
                    class="mx-5"
                  ></v-text-field>
                  <v-btn
                    @click="atualizar"
                    class="justify-center bg-cor_marron_escuro rounded-xl w-75 ml-12 my-5"
                    color="cor_fundo"
                    variant="outlined"
                  >
                    Atualizar
                  </v-btn>
                </v-card>
              </v-col>
            </v-row>
          </v-card>
        </v-container>
        <!-- Snackbar para mensagens -->
        <v-snackbar v-model="snackbar.show" :timeout="3000" :color="snackbar.color" top>
          {{ snackbar.message }}
        </v-snackbar>
      </v-main>
    </v-app>
  </template>
  
  <script setup lang="ts">
  import { useSupabase } from '~/composables/useSupabase';
  import { useDisplay } from 'vuetify';
  import { ref, onMounted } from 'vue';
  import { useRouter, useRoute } from 'vue-router';
  
  const { mdAndUp } = useDisplay();
  const name = ref('');
  const username = ref('');
  const email = ref('');
  const password = ref('');
  const usuario = ref({ foto: '/img/perfil.png' }); // Definindo a foto padrão inicialmente
  const supabase = new useSupabase();
  const router = useRouter();
  const route = useRoute();
  const fileInput = ref(null); // Referência para o input de arquivo
  
  // Controle do Snackbar
  const snackbar = ref({
    show: false,
    message: '',
    color: 'success'
  });
  
  // Função para validar email
  const validateEmail = (value: string) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(value) || 'Insira um email válido';
  };
  
  // Função para carregar dados do usuário ao montar o componente
  onMounted(async () => {
    const userId = localStorage.getItem('userId');
    if (userId) {
      const user = await supabase.getUsuario(userId);
      if (user) {
        name.value = user.name;
        username.value = user.username;
        email.value = user.email;
        usuario.value = user; // Carregar os dados completos do usuário, incluindo a foto
      }
    }
  });
  
  // Função para atualizar o perfil do usuário
  async function atualizar() {
    const userId = localStorage.getItem('userId');
    if (userId && username.value && email.value) {
      try {
        
        const updates = {

          name: name.value,
          username: username.value,
          email: email.value,
          password: password.value || undefined, // Atualiza senha apenas se preenchida
        };
        
  
        const { success, message } = await supabase.updateUserProfile(userId, updates.name, updates.username, updates.email, updates.password); 
        snackbar.value.message = message;
        snackbar.value.show = true;
        snackbar.value.color = success ? 'success' : 'error';
  
        if (success) {
          setTimeout(() => {
            router.push('/perfil'); // Redireciona para a página de perfil
          }, 3000);
        }
      } catch (error) {
        snackbar.value.message = 'Erro ao atualizar perfil. Tente novamente.';
        snackbar.value.show = true;
        snackbar.value.color = 'error';
      }
    } else {
      snackbar.value.message = 'Por favor, preencha todos os campos obrigatórios.';
      snackbar.value.show = true;
      snackbar.value.color = 'error';
    }
  }
  
  // Função para selecionar a nova foto de perfil
  function selectProfilePicture() {
    fileInput.value.click();
  }
  
  // Função para fazer o upload da nova foto de perfil
  async function uploadProfilePicture(event: Event) {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (file) {
      const userId = localStorage.getItem('userId');
      const filePath = `fotos/${userId}-${file.name}`;
      const { success, message, url } = await supabase.uploadPhoto(file, filePath);
      if (success && url) {
        // Atualiza a foto de perfil do usuário e salva o endereço na tabela dos usuários
        const updates = { foto: filePath };
        const updateProfile = await supabase.updateUserProfile(userId, updates);
        if (updateProfile.success) {
          usuario.value.foto = url; // Atualiza a foto de perfil do usuário
          snackbar.value.message = 'Foto de perfil atualizada com sucesso!';
          snackbar.value.color = 'success';
        } else {
          snackbar.value.message = updateProfile.message || 'Erro ao atualizar foto de perfil na tabela de usuários.';
          snackbar.value.color = 'error';
        }
      } else {
        snackbar.value.message = message || 'Erro ao atualizar foto de perfil.';
        snackbar.value.color = 'error';
      }
      snackbar.value.show = true;
    }
  }
  </script>
  
  <style scoped>
  .d-none {
    display: none;
  }
  </style>
  