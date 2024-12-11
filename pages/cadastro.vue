<template>
    <v-app class="bg-cor_fundo ">
      <v-container fluid fill-height class="d-flex justify-center align-center h-100">
        <v-card class="d-flex align-center justify-center " width="50vw">
          <v-row no-gutters class="w-100 h-100">
            <v-col cols="6" class="d-flex align-center justify-center ">
              <v-card class="bg-cor_card_login  justify-center" height="100%" width="100%">
                <v-btn class="bg-transparent elevation-0" href="/login">
                    Voltar
                </v-btn>
                <v-card-text class="text-center text-h5 font-weight-light mt-5" >
                    OLÁ, FAÇA SEU CADASTRO!
                </v-card-text>
                <v-text-field v-model="name" label="Name" class="mx-5 rounded-lg" ></v-text-field>
                <v-text-field v-model="username" label="Username" class="mx-5 rounded-lg" ></v-text-field>
                <v-text-field v-model="email" label="Email" class="mx-5 rounded-lg" ></v-text-field>
                <v-text-field v-model="password" label="Password" class="mx-5 " ></v-text-field>
                <v-btn  @click="cadastrar" class="justify-center bg-cor_marron_escuro rounded-xl w-75 ml-12 my-5 " color="cor_fundo" variant="outlined">
                    CADASTRAR
                </v-btn>
                
              </v-card>
            </v-col>
            <v-col cols="6" class="d-flex align-center justify-center">
              <v-img
                class=""
                src="/img/logo_hd.png"
                height="470"
                cover
              />
            </v-col>
          </v-row>
        </v-card>
      </v-container>
    </v-app>
  </template>
  
  <script setup lang="ts"> 
  import { useSupabase } from '~/composables/useSupabase';

  const name = ref(''); 
  const username = ref(''); 
  const email = ref(''); 
  const password = ref(''); 
  const supabase = new useSupabase();
  const router = useRouter();
  
  async function cadastrar() {
    if (username.value && email.value && password.value) {
      const data = await supabase.createUser(name.value, username.value, email.value, password.value);
    if (data) { 
      router.push('/login');
    }
    }
  }
  

  </script>
  