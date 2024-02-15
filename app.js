require('colors');
const fs = require('fs');

const datosArchivo = require('./datos.json');
//const { Console } = require('console');

const main = async() =>{
    console.clear();
    console.log(':::::::::::::::::::::::'.bgGreen);
    console.log('::: PROYECTO TIENDA  :::'.bgGreen);
    console.log(':::::::::::::::::::::::\n'.bgGreen);
    
    class Producto {
        #codigoProducto;
        #nombreProducto;
        #inventarioProducto;
        #precioProducto;

        constructor(){
            this.#codigoProducto = '';
            this.#nombreProducto = '';
            this.#inventarioProducto = 0;
            this.#precioProducto = 0;
        }

        set setCodigoProducto(value){
            this.#codigoProducto = value;
        }

        get getCodigoProducto(){
            return this.#codigoProducto;
        }

        set setNombreProducto(value){
            this.#nombreProducto = value;
        }

        get getNombreProducto(){
            return this.#nombreProducto;
        }

        set setInventarioProducto(value){
            this.#inventarioProducto = value;
        }

        get getInventarioProducto(){
            return this.#inventarioProducto;
        }

        set setPrecioProducto(value){
            this.#precioProducto = value;
        }

        get getPrecioProducto(){
            return this.#precioProducto;
        }
     }



     class ProductosTienda{
     #listaProductos;

     constructor(){
        this.#listaProductos = [];
     }

     get getListaProductos(){
        return this.#listaProductos;
     }

      cargaArchivoProductos(){//Esta funcion carga los datos desde un archivo JSON y lo agrega a una lista de objetos
        let contador = 0;
          if(datosArchivo.length > 0){//Se verifica si contiene elementos datosArchivos
            datosArchivo.forEach(objeto => { /*Se utiliza para para recorrer los elementos de datosArchivo 
                y realizar la carga de productos en un arreglo this.#listaProductos 
                a medida que se procesa cada elemento del arreglo.*/
              contador++;
                let producto = new Producto;
                producto.setCodigoProducto = objeto.codigoProducto;
                producto.setNombreProducto = objeto.nombreProducto;
                producto.setInventarioProducto = objeto.inventarioProducto;
                producto.setPrecioProducto = objeto.precioProducto;
                this.#listaProductos.push(producto);
              });

             }else {
           console.log(`ERROR. el archivo datos.json no contiene datos\n` .bgBlue);
          }
           console.log(`Total de productos cargados ==> `.bgBlue + ` ${contador} ` .bgMagenta);
          }

      grabaArchivoProductos(){
        const instanciaClaseAObjetos = this.getListaProductos.map(producto => { /*Se utiliza map para transformar 
          cada objeto de la lista de productos, en un nuevo arreglo de objetos que contiene ciertos atributos de cada producto*/
          return {
                codigoProducto: producto.getCodigoProducto,
                nombreProducto: producto.getNombreProducto,
                inventarioProducto: producto.getInventarioProducto,
                precioProducto: producto.getPrecioProducto
            };
         });

           const cadenaJson = JSON.stringify(instanciaClaseAObjetos,null,2);/*Aqui convierto un objeto 
           en una cadena de texto JSON,(null se utiliza para incluir las propiedades del objeto,2 se utiliza para controlar el espacio)*/
           const nombreArchivo = 'datos.json';
           fs.writeFileSync(nombreArchivo, cadenaJson, `UTF-8`);/* se utiliza para escribir la cadena JSON en un 
           archivo con el nombre (nombreArchivo), y el programa esperará a que se complete la escritura antes de continuar*/

           console.log(`DATOS GUARDADOS EN ${nombreArchivo}`.bgMagenta);
          }

      mostrarProductos(){//Estoy iterando los productos de getListaProductos(arreglo) y lo paso a un parametro llamado producto
           this.getListaProductos.forEach(producto => {
           console.log(`|     ` + producto.getCodigoProducto + `     |` +
                       `|   ` + producto.getNombreProducto + `           |` +
                       `|    ` + producto.getInventarioProducto +             ` |`   +   
                       `|         ` + producto.getPrecioProducto + `     |` );
           })//imprimo en la consola todos los productos de la instancia productos
         }
      
      digitalizarProducto() {
         return new Promise((resolve, reject) => {/*Aquí se está creando una nueva promesa,podremos saber si 
         aquel proceso se produjo de manera correcta o no,(si fue correcto usaremos la función resolve(),
          y si algo falló usaremos la función reject())*/
             const productos = new Producto;
            
             const readline = require('readline').createInterface({/*el objeto readline nos permite leer la entrada del usuario
              desde el teclado y mostrar la salida en la consola.(Se creo una interfaz usando al readline.createInterface)*/
                input: process.stdin,/*El objeto se configura para interactuar con el usuario a través de la entrada */
                output: process.stdout/*El objeto se configura para interactuar con el usuario a traves de la 
                salida estandar de la consola*/
             });

                //Esta ingresando valores dependiendo de las preguntas y dependiendo de las respuestas se instancia en productos
              readline.question('¿Desea digitalizar un producto? (Si/No): ', (answer) => {
                if (answer.toLowerCase() === 'si') {
              readline.question('Digite su nombre: ', (nombreComprador) => {
              productos.setNombreComprador  = nombreComprador;
              readline.question('Digite el código del producto: ', (codigoProducto) => {
              productos.setCodigoProducto = codigoProducto;

              readline.question('Digite el nombre del producto: ', (nombreProducto) => {
              productos.setNombreProducto = nombreProducto;

              readline.question('Digite el inventario del producto: ', (inventarioProducto) => {
              productos.setInventarioProducto = inventarioProducto;

              readline.question('Digite el precio del producto: ', (precioProducto) => {
              productos.setPrecioProducto = precioProducto;
              this.#listaProductos.push(productos);
                readline.close();
                resolve();
                             });
                          });
                       });
                    });
                 });
              } else {
                readline.close();
                reject();
                }
             });
          });
         }


      ejecutarPrograma() {
        return new Promise(async (resolve, reject) => {//async devuelve un elemento promise
          do {/* Se abre un bucle do while que permite que el programa se ejecute en un ciclo hasta que el usuario lo detenga*/
            try {//Se utiliza este bloque para capturar cualquier excepción que pueda ocurrir al llamar a digitalizarProducto
                await this.digitalizarProducto();//Se utiliza await para llamar la funcion y espera hasta que se resuelva la promesa devuelta//
             } catch (error) {
                break;//Si ocurre un error se ejecuta break para salir del bucle
            }

            console.clear();
            console.log(`DATOS APERTURA TIENDA`.bgBlue);

            this.mostrarProductos();

            this.getListaProductos.forEach(productos => {/*forEach lo utilizo para para iterar sobre los productos en getListaProductos
             y se actualiza el inventario de cada producto con un valor aleatorio*/
                productos.setInventarioProducto = Math.floor(Math.random() * (20 - 1) + 1);
            });

            console.log(`DATOS CIERRE TIENDA`.bgGreen);
            this.mostrarProductos();

            this.grabaArchivoProductos();

            console.log('---------------------------------------');

                 } while (true);
                 const readline = require('readline').createInterface({
                    input: process.stdin,
                    output: process.stdout
                });

                 readline.question('¿Desea ingresar otro producto? (Si/No): ', (answer) => {
                 if (answer.toLowerCase() === 'no') {
                 readline.close();
                 resolve();
                 } else {
                 readline.close();
                    }
                });
            });
         }
        }


     let productosTienda = new ProductosTienda;

     productosTienda.cargaArchivoProductos();//Se ejecuta para inicializar los datos de la tienda.

     await productosTienda.ejecutarPrograma();/*await indica que se espera a que esta función se complete antes de continuar
      con la siguiente instrucción.*/


}
    


main();