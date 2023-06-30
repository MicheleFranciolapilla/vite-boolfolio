<script>
    import { store } from "../store";
    export default
    {
        name    : "Comp_Header",
        data()
        {
            return  {
                        store,
                        menu_items  :   [
                                            {
                                                // Indice dell'item
                                                item_id         :   0,
                                                // Label dell'item
                                                item_name       :   'Home',
                                                // Tipologia di item
                                                item_type       :   'route',
                                                // Rotta di atterraggio
                                                item_to         :   'home', 
                                                // Array con tutte le pagine in cui l'item è presente
                                                item_in_pages   :   [
                                                                    ]
                                            },
                                            {
                                                item_id         :   1,
                                                item_name       :   'About',
                                                item_type       :   'js',
                                                item_js_method()    {},
                                                item_in_pages   :   [
                                                                        'home'
                                                                    ]
                                            },
                                            {
                                                item_id         :   2,
                                                item_name       :   'Progetti',
                                                item_type       :   'dd',
                                                item_dd_ref     :   'projects_dropdown',
                                                item_in_pages   :   [
                                                                        'home'
                                                                    ]
                                            },
                                            {
                                                item_id         :   3,
                                                item_name       :   'Tutti',
                                                item_type       :   'dd_route',
                                                item_to         :   'projects',
                                                item_dd_ref     :   'projects_dropdown',
                                                item_in_pages   :   [
                                                                        'home'
                                                                    ]
                                            },
                                            {
                                                item_id         :   10,
                                                item_name       :   'Login / Registrazione',
                                                item_type       :   'anchor',
                                                item_to         :   store.api_url_root,
                                                item_in_pages   :   [
                                                                        'home'
                                                                    ]
                                            }
                                        ],
                    }
        }
    }
</script>

<template>
    <header class="fixed-top">
        <nav class="navbar navbar-expand-lg navbar-light bg-light">
            <div class="container-fluid">
                <div id="nav_left" class="d-flex justify-content-center align-items-center column-gap-2 border border-1 border-dark ps-3">
                    <span>Powered by</span>
                    <a class="navbar-brand" href="#">
                        <img src="../assets//vue.svg" alt="Logo Vue">
                    </a>
                </div>
                <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#collapse_btn" aria-controls="collapse_btn" aria-expanded="false" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                </button>
                <div class="collapse navbar-collapse" id="collapse_btn">
                    <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                        <li 
                         v-for="(item) in menu_items" 
                         :key="item.item_id">

                        </li>
                    </ul>




                    <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                        <li class="nav-item">
                            <a class="nav-link active" aria-current="page" href="#">Home</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" href="#">Link</a>
                        </li>

                        <li class="nav-item dropdown">
                            <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                Dropdown
                            </a>
                            <ul class="dropdown-menu" aria-labelledby="navbarDropdown">
                                <li><a class="dropdown-item" href="#">Action</a></li>
                                <li><a class="dropdown-item" href="#">Another action</a></li>
                                <li><hr class="dropdown-divider"></li>
                                <li><a class="dropdown-item" href="#">Something else here</a></li>
                            </ul>
                        </li>
                        
                        <li class="nav-item">
                            <a :href="abc" class="nav-link">Login</a>
                        </li>
                    </ul>
                    <form class="d-flex">
                        <input class="form-control me-2" type="search" placeholder="Cerca testo ..." aria-label="Search">
                        <button class="btn btn-outline-success" type="submit">Cerca</button>
                    </form>
                </div>
            </div>
        </nav>
    </header>
</template>

<style scoped lang="scss">
    // Uso del foglio di stile scss
    @use "../assets/style/main.scss" as *;

    header
    {
        height: $header_height;
        z-index: 999;
    }
</style>