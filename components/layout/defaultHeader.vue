<template>
<v-app-bar color="cor_barra">
        <v-row class="justify-space-between">
          <v-col cols="1">
            <v-img src="/img/mini_logo.png" :width="70" />
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
          <v-col  cols="1">
            
            <v-menu
      v-model="menu"
      :close-on-content-click="false"
      location="bottom"
    >
      <template v-slot:activator="{ props }">
        <v-btn
          size="x-large"
          color="indigo"
          v-bind="props"
        >
        <v-img src="/img/perfil.png" :width="70" />
        </v-btn>
      </template>

      <v-card class="mt-2">
       
        <v-divider></v-divider>

         

      <v-list>
        <v-list-item>
          <v-btn to="/perfil" variant="text" prepend-icon="mdi-account">
            Perfil
          </v-btn>
        </v-list-item>
        <v-list-item>
          <v-btn @click="clearUserId" variant="text"  prepend-icon="mdi-logout">
            Sair
          </v-btn>
        </v-list-item>
        
          
      </v-list>
     
          
          
          
        
      </v-card>
    </v-menu>
          </v-col>
        </v-row>
      </v-app-bar>
</template>

<script setup>
  
  const menu = ref(false);
  const router = useRouter();
  

  function clearUserId() {
  localStorage.removeItem('userId');
  console.log('User ID removido do cache.');
  router.push('/login');}

  </script>