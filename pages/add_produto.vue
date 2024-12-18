<template>
    <v-app>
        <v-app-bar color="cor_barra">
            <v-row class="justify-space-between">
                <v-col cols="1">
                    <v-img
                        src="/img/mini_logo.png"
                        :width="70"
                    >
                    
                    </v-img>
                </v-col>
                <v-col cols="4" >
                    <v-text-field
                        v-model="search"
                        append-icon="mdi-magnify"
                        label="O que você esta buscando?"
                        single-line
                        hide-details
                        @click:append="executeSearch"
                        class="white--text"
                    ></v-text-field>
                </v-col>
                <v-col cols="1">
                    <v-img
                        src="/img/perfil.png"
                        :width="70"
                    >
                    
                    </v-img>
                </v-col>
            </v-row>
        </v-app-bar>
        <v-main class="bg-cor_fundo">
            <v-container class="justify-center  h-100">
                <v-btn class="bg-transparent elevation-0">
                    Voltar
                </v-btn>
                <p class="text-cor_mini_menu my-2 text-h4 text-center mb-8">
                        ADICIONAR LOJA
                        </p>
                <v-row class="justify-center rounded-xl bg-cor_card_login w-100 ">
                    <v-col cols="3" class="justify-center">
                    <v-btn height="200" width="200" class="rounded-circle">
                        <v-img
                            src="/img/add_loja.png"
                            height="200"
                            width="200"
                            class="rounded-circle"
                            aspect-ratio="1/1"
                            cover
                            >
                            
                        </v-img>
                    </v-btn>
                    

                        
                        <v-btn color="cor_marron_claro my-5 ml-2" class="rounded-xl elevation-10">
                            Adicionar Perfil
                    </v-btn>
                    </v-col>
                    <v-col cols="8">
                        
                        <v-text-field v-model="name" label="Nome da Loja" class="rounded-lg w-100" ></v-text-field>
                        <v-row class="mx-1">
                        <v-autocomplete
                        class=""
                            item-value="id"
                            item-title="name"
                            ref="categoria"
                            v-model="selectedCategorie"
                            :items="categorie"
                            :rules="[() => !!categorie || 'Seleciona uma categoria']"
                            label="Categoria"
                            placeholder="Selecione..."
                            required

                        ></v-autocomplete>
                        <v-text-field  v-model="contact" label="Contato" class="ml-3" ></v-text-field>

                        </v-row>
                        
                        <v-textarea  v-model="description" label="Descrição" class=" rounded-lg" rows="4" multiline maxlength="290"></v-textarea>
                        <v-btn  @click="cadastrarLoja" class="justify-center bg-cor_marron_escuro rounded-xl w-75 ml-12 my-5 " color="cor_fundo" variant="outlined">
                            CADASTRAR
                        </v-btn>
                    </v-col>
                </v-row>
                
            </v-container>

        </v-main>
    </v-app>
</template>


<script setup lang="ts"> 
import { useSupabase } from '~/composables/useSupabase';

const name = ref(''); 
const description = ref(''); 
const contact = ref(''); 
const categorie = ref();
const selectedCategorie = ref();
const supabase = new useSupabase();
const router = useRouter();
const userId = ref();


async function cadastrarLoja() {
    userId.value = localStorage.getItem('userId');

    if (name.value && selectedCategorie.value && contact.value && description.value) {
        await supabase.createStore(name.value, selectedCategorie.value, contact.value, description.value, userId.value);
        router.push("/perfil");
    }

}

onMounted(async() => {

    categorie.value = await supabase.getCategorias();
});



</script>