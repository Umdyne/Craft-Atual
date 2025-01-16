<template>
  <v-app class="bg-cor_fundo ">
    <layout-default-header></layout-default-header>
    <v-main class="bg-cor_fundo">
      <!-- <pre>
        {{ categorias }}
      </pre> -->
      <v-container>
        <p class="text-cor_barra text-center text-h5">EXPLORE</p>
        <v-card class="mx-auto bg-transparent elevation-0" max-width="1000">
          <v-container fluid>
            <v-row dense>
              <v-col
              cols="12"
                        md="4"
                        sm="6"
                        lg="4"
                v-for="categoria in categorias"
                :key="categoria.id"
              >
                <v-list-item class="text-decoration-none">
                  <v-card :href="`/categorias/${categoria.id}`" class="rounded-xl card-hover">
                    <v-img
                      :src="categoria.imagem"
                      class="align-end"
                      gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
                      height="200px"
                      cover
                    >
                      <v-card-title class="text-center text-cor_fundo text-h5">
                        {{ categoria.name }}
                      </v-card-title>
                    </v-img>
                  </v-card>
                </v-list-item>
              </v-col>
            </v-row>
          </v-container>
        </v-card>
      </v-container>
    </v-main>
  </v-app>
</template>

<script setup lang="ts">
    import { useSupabase } from '~/composables/useSupabase';

    const usuario = ref();
    const userId = ref();
    const categorias = ref();

const supabase = new useSupabase();

onMounted(async () => {
    userId.value = localStorage.getItem('userId');

    if (userId.value) {
        usuario.value = await supabase.getUsuario(userId.value);
        categorias.value = await supabase.getCategorias(userId.value);
        console.log('Dados do usuário:', usuario.value);
    }
});
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
