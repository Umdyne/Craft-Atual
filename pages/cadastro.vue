<template>
  <v-app class="bg-cor_fundo">
    <v-container fluid fill-height class="d-flex justify-center align-center h-100">
      <v-card class="d-flex align-center justify-center flat elevation-0" width="60vw">
        <v-row no-gutters class="w-100 h-100">
          <v-col
            cols="12" md="6"
            class="d-flex align-center justify-center bg-cor_fundo flat elevation-0"
          >
            <img
              class="w-100 bg-transparent"
              src="/img/logo_hd.png"
              contain  
              v-if="mdAndUp"
            />
            <img
              class="w-25"
              src="/img/logo_hd.png"
              style="border-radius: 100%"
              contain  
              v-else
            />
          </v-col>
          <v-col cols="12" md="6" class="d-flex align-center justify-center">
            <v-card class="bg-cor_card_login justify-center" height="100%" width="100%">
              <v-btn class="bg-transparent elevation-0" href="/login">
                Voltar
              </v-btn>
              <v-card-text class="text-center text-h5 font-weight-light mt-5">
                OLÁ, FAÇA SEU CADASTRO!
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
                @click="cadastrar"
                class="justify-center bg-cor_marron_escuro rounded-xl w-75 ml-12 my-5"
                color="cor_fundo"
                variant="outlined"
              >
                CADASTRAR
              </v-btn>
            </v-card>
          </v-col>
        </v-row>
      </v-card>
    </v-container>
    <!-- Snackbar para mensagens -->
    <v-snackbar
      v-model="snackbar.show"
      :timeout="3000"
      color="success"
      top
    >
      {{ snackbar.message }}
    </v-snackbar>
  </v-app>
</template>

<script setup lang="ts">
import { useSupabase } from '~/composables/useSupabase';
import { useDisplay } from 'vuetify';
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const { mdAndUp } = useDisplay();
const name = ref('');
const username = ref('');
const email = ref('');
const password = ref('');
const supabase = new useSupabase();
const router = useRouter();

// Controle do Snackbar
const snackbar = ref({
  show: false,
  message: '',
});

// Função para validar email
const validateEmail = (value: string) => {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(value) || 'Insira um email válido';
};

async function cadastrar() {
  if (username.value && email.value && password.value) {
    try {
      const data = await supabase.createUser(name.value, username.value, email.value, password.value);
      if (data) {
        snackbar.value.message = 'Cadastro realizado com sucesso!';
        snackbar.value.show = true;
        setTimeout(() => {
          router.push('/login');
        }, 3000);
      }
    } catch (error) {
      snackbar.value.message = 'Erro ao realizar o cadastro. Tente novamente.';
      snackbar.value.show = true;
    }
  } else {
    snackbar.value.message = 'Por favor, preencha todos os campos.';
    snackbar.value.show = true;
  }
}
</script>
