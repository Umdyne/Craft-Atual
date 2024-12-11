<template>
  <v-app class="bg-cor_fundo ">
   
    <v-container fluid fill-height class="d-flex justify-center align-center h-100">
      <v-card class="d-flex align-center justify-center " height="25vw" width="50vw">
        <v-row no-gutters class="w-100 h-100">
          <v-col cols="6" class="d-flex align-center justify-center ">
            <v-card class="bg-cor_card_login  justify-center" height="100%" width="100%">
              <v-card-text class="text-center text-h5 font-weight-light mt-10">
                  OLÁ, FAÇA SEU LOGIN!
              </v-card-text>
              <v-text-field v-model="username" label="Username" class="mx-5 rounded-lg" ></v-text-field>
              <v-text-field v-model="password" type="password" label="Password" class="mx-5 " ></v-text-field>
              <v-btn @click="login" class="justify-center bg-cor_marron_escuro rounded-xl w-75 ml-12 my-5 " color="cor_fundo" variant="outlined">
                  ENTRAR
              </v-btn>
              
              <v-btn class="text-center text-h6 font-weight-light mt-10 bg-transparent elevation-0 justify-center ml-6"
              href="/cadastro">
                  Não possui cadastro ainda?  Cadastre-se
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

const username = ref(''); 
const password = ref(''); 
const supabase = new useSupabase();
const userId = ref();
const router = useRouter();

async function login() {
try {
  const dados = await supabase.verificarUsuario(username.value, password.value);

  if (dados?.id) {
    // Armazenar o ID no localStorage
    localStorage.setItem('userId', dados.id);
    console.log('ID armazenado no cache:', dados.id);
    userId.value = dados.id;
  } else {
    console.error('ID não encontrado nos dados retornados.');
    userId.value = null;
  }
} catch (error) {
  userId.value = null;
  console.error('Erro ao realizar login:', error);
}
}

function getUserId() {
const idUser = localStorage.getItem('userId');
if (idUser) {
  userId.value = idUser;
  console.log('User ID recuperado do cache:', idUser);
} else {
  userId.value = null;
  console.error('Nenhum User ID encontrado no cache.');
}
}

watch(userId, (newValue) => {
  console.log('User ID atualizado:', newValue);
  if (newValue) {
    router.push('/home');
  }
});

onMounted(() => {
  getUserId();
});
</script>
