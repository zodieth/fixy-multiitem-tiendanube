"use client";
import { useState } from "react";
import Papa from "papaparse";
import * as XLSX from "xlsx";
import products from "../json/products.json";

const FileUploader = () => {
  const [fileData, setFileData] = useState(null);

  const handleFileChange = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    // Leer el archivo CSV
    const parsedData = await readCSV(file);

    // Procesar datos, cambiar el formato, etc.
    const formattedData = processData(parsedData);

    // Generar el archivo XLSX
    generateXLSX(formattedData);
  };

  const readCSV = (file) => {
    return new Promise((resolve) => {
      const reader = new FileReader();
  
      reader.onload = (event) => {
        // El resultado ya es un string con la codificación correcta
        const csvData = event.target.result;
  
        // Parseamos el CSV con PapaParse
        const parsedData = Papa.parse(csvData, {
          header: true,
          skipEmptyLines: true,
        });
  
        resolve(parsedData.data);
      };
  
      // Leemos el archivo con la codificación ISO-8859-1
      reader.readAsText(file, "ISO-8859-1");
    });
  };
  
  

  // const cleanPhoneNumber = async (phoneNumber) => {
  //   const cleanedInitialChars = await phoneNumber.replace(/['\s]/g, "");
  //   const cleanedPrefix = await cleanedInitialChars.replace(/^(\+54|54)?/, "");
  //   let cleanedNumber = await cleanedPrefix
  //     .replace(/\s/g, "")
  //     .replace(/-/g, "");

  //   while (cleanedNumber.toString().length > 10) {
  //     // Convertimos el número a cadena para manipularlo como texto
  //     let numStr = cleanedNumber.toString();

  //     // Eliminamos el primer dígito
  //     cleanedNumber = parseInt(numStr.slice(1));
  //   }

  //   if (!isNaN(cleanedNumber)) {
  //     cleanedNumber = parseInt(cleanedNumber);
  //   }

  //   return cleanedNumber;
  // };

  // const cleanPostalCode = async (postalCode) => {
  //   // Eliminar letras y comillas simples del código postal
  //   let cleanedPostalCode = await postalCode.replace(/[a-zA-Z'']/g, "");

  //   if (!isNaN(cleanedPostalCode)) {
  //     cleanedPostalCode = parseInt(cleanedPostalCode);
  //   }

  //   return cleanedPostalCode;
  // };

  // const cleanedId = (id) => {
  //   const split = id.split("");
  //   split.shift();
  //   const textoSinHashtag = split.join("");

  //   return textoSinHashtag;
  // };

  // const cleanBlankSpace = (text) => {
  //   const textoSinEspacios = text.replace(/\s/g, "").toLowerCase();
  //   return textoSinEspacios;
  // };

  // const removeAccentsAndSpecialChars = (str) => {
  //   return str
  //     .normalize("NFD") // Normalizar para separar caracteres diacríticos
  //     .replace(/[\u0300-\u036f]/g, "") // Eliminar diacríticos
  //     .replace(/[áäâ]/gi, "a") // Reemplazar letras con acentos
  //     .replace(/[éëê]/gi, "e") // Reemplazar letras con acentos
  //     .replace(/[íïî]/gi, "i") // Reemplazar letras con acentos
  //     .replace(/[óöô]/gi, "o") // Reemplazar letras con acentos
  //     .replace(/[úüû]/gi, "u") // Reemplazar letras con acentos
  //     .replace(/ñ/gi, "n") // Reemplazar ñ por n
  //     .replace(/ü/gi, "u"); // Reemplazar ü por u
  // };

  // const weightHeight = async (item) => {
  //   for (let i = 0; i < products.products.length; i++) {
  //     if (item["Lineitem name"] === products.products[i].name) {
  //       return {
  //         peso: products.products[i].peso * item["Lineitem quantity"],
  //         largo: products.products[i].largo * item["Lineitem quantity"],
  //         ancho: products.products[i].ancho,
  //         alto: products.products[i].alto,
  //         valor: products.products[i].valor,
  //       };
  //     }
  //   }
  //   return;
  // };

  let emailInicial=""
  let referencia =1


  const processData = async (data) => {
    const newData = await Promise.all(
      data.map(async (item) => {
        // const cleanedPhoneNumber = await cleanPhoneNumber(
        //   item["Shipping Phone"]
        // );
        // const cleanedCodpostal = await cleanPostalCode(item["Shipping Zip"]);
        // const shippingCity = removeAccentsAndSpecialChars(
        //   item["Shipping City"]
        // );
        // const shippingAddress = await removeAccentsAndSpecialChars(
        //   item["Shipping Address1"]
        // );

        // const shippingAddress2 = await removeAccentsAndSpecialChars(
        //   item["Shipping Address2"]
        // );
        // const shippingName = await removeAccentsAndSpecialChars(
        //   item["Shipping Name"]
        // );

        // const isProductInJSON = products.products.some(
        //   (product) => product.name === item["Lineitem name"]
        // );

        const sku = await item["SKU"]
        const cantidadSku = await item["Cantidad del producto"]
        

        if(item["Email"]===emailInicial){
          return{
            referencia_retiro: referencia-1,
            "productos.descripcion":"",
            tipo_operacion: "",
            sector: "",
            cliente_id: ""          ,
            servicio_id: "",
            codigo_sucursal: "",
            "comprador.localidad":"",
            "datosEnvios.valor_declarado":"",
            "datosEnvios.confirmada":"",
            trabajo:"",
            remito:"",
            "sender.empresa":"",
            "sender.remitente":"",
            "sender.calle":"",
            "sender.altura":"",
            "sender.localidad":"",
            "sender.provincial":" ",
            "sender.cp":"",
            "comprador.empresa":"",
            "comprador.calle":"",
            "comprador.altura":"",
            "comprador.piso":"",
            "comprador.dpto":"",
            "comprador.provincia":"",
            "comprador.cp":"",
            "comprador.celular":"",
            "comprador.email":"",
            "comprador.other_info":"",
            "comprador.horario":"",
            "comprador.obs1":"",
            "comprador.obs2":"",
            "datosEnvios.bultos":"",
            "datosEnvios.peso":"",
            "datosEnvios.alto":"",
            "datosEnvios.ancho":"",
            "datosEnvios.largo":"",
            "datosEnvios.observaciones":"",
            "item.bulto":cantidadSku,
            "item.peso":"",
            "item.alto":"",
            "item.largo":"",
            "item.profundidad":"",
            "item.descripcion":"",
            "item.sku":sku
          }
        }

        
       




        emailInicial=await item["Email"];
        const total = await item["Total"];
        const remito =
          (await item["Lineitem name"]) + " X" + item["Lineitem quantity"];
        const nombre = await item["Nombre del comprador"];
        const calle = await item["Dirección"];
        const altura = await item["Número"];
        const piso = await item["Piso"]
        const localidad = await item["Localidad"];
        const zip = await item["Código postal"];
        const celular = await item["Teléfono para el envío"];
        const email = await item["Email"];
        const provincia=await item['Provincia o estado']
        const cantidadProducto = await item["Cantidad del producto"]
        const id = await (item["Número de orden"]);
        const seguimiento = await item["Código de tracking del envío"]
        const servicioCorreo = await(item["Medio de envío"]==="Envío Nube - Andreani a domicilio")?56:(item['Medio de envío']==="Punto de retiro")?57:''



        // const match = shippingAddress.match(/^(.*?)(\d+)$/);

        // let street = shippingAddress;
        // let height = "";
        const observaciones = await item["Notas del comprador"]


        // if (match) {
        //   street = match[1].trim();
        //   height = match[2].trim();
        //   if (!isNaN(height)) {
        //     height = parseInt(height);
        //   }
        // }

        // const pesaje = await weightHeight(item);


     


        referencia++
        return {
          referencia_retiro: referencia-1,
          "productos.descripcion":"",
          tipo_operacion: "REDESP",
          sector: "OP",
          cliente_id: 1029          ,
          servicio_id: servicioCorreo,
          codigo_sucursal: 1700578896,
          "comprador.localidad":localidad,
          "datosEnvios.valor_declarado":0,
          "datosEnvios.confirmada":1,
          trabajo:"",
          remito:seguimiento,
          "sender.empresa":"PerlaStore",
          "sender.remitente":"Agustín Millozzi",
          "sender.calle":"Libertad",
          "sender.altura":"470",
          "sender.localidad":"MARTINEZ",
          "sender.provincia":"BUENOS AIRES",
          "sender.cp":"1640",
          "comprador.empresa":"",
          "comprador.apellido_nombre":nombre,
          "comprador.calle":calle,
          "comprador.altura":altura,
          "comprador.piso":piso,
          "comprador.dpto":"",
          "comprador.provincia":provincia,
          "comprador.cp":zip,
          "comprador.celular":celular,
          "comprador.email":email,
          "comprador.other_info":observaciones,
          "comprador.horario":"",
          "comprador.obs1":"",
          "comprador.obs2":"",
          "datosEnvios.bultos":1,
          "datosEnvios.peso":1,
          "datosEnvios.alto":1,
          "datosEnvios.ancho":1,
          "datosEnvios.largo":1,
          "datosEnvios.observaciones":"",
          "item.bulto":cantidadSku,
          "item.peso":1,
          "item.alto":1,
          "item.largo":1,
          "item.profundidad":1,
          "item.descripcion":"",
          "item.sku":sku
        };


        
      })
    );

    function formatearNumeros(datos) {
      return datos.map((item) => {
        if (item["peso(obligatorio en KG)"]) {
          item["peso(obligatorio en KG)"] = Number(
            item["peso(obligatorio en KG)"]
          ).toFixed(1); // Asegurar dos decimales
        }
        return item;
      });
    }

    const newDataFormateada = formatearNumeros(newData);

    const workbook = XLSX.utils.book_new();
    const worksheet = XLSX.utils.json_to_sheet(newDataFormateada);
    XLSX.utils.book_append_sheet(workbook, worksheet, "Nueva Hoja");
    XLSX.writeFile(workbook, "cargamasiva_correoargentino.xlsx");

    return workbook;
  };

  const generateXLSX = (data) => {
    if (!Array.isArray(data)) {
      data = [data];
    }

    const worksheet = XLSX.utils.json_to_sheet(data);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");
  };

  return (
    <div className="mx-10 md:mx-2 flex items-center justify-center h-screen">
      <div className="max-w-2xl mx-auto">
        <label
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
          htmlFor="file_input"
        >
          Subir archivo{" "}
        </label>
        <input
          onChange={handleFileChange}
          className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
          id="file_input"
          type="file"
        />

        <p className="mt-5">
          Sistema de mapeo de celdas de tiendanube csv a excel multiitemde
          fixy
          <a className="text-blue-600 hover:underline" href="#" target="_blank">
            Mateo
          </a>
          .
        </p>
      </div>
    </div>
  );
};

export default FileUploader;
