// plugins/misFunciones.js
import axios from "axios"
import { formatToNumber, formatToCurrency } from "simple-mask-money";
import Swal from "sweetalert2";

export default (context, inject) => {
	const sheets = async (accesstoken, sheet, method, datos) => {
		let data = JSON.stringify({
			"values": [
				datos
			]
		});

		let config = {
			method: method,
			maxBodyLength: Infinity,
			url: `https://sheets.googleapis.com/v4/spreadsheets/1pyseGpCf96sJy-F_7OSkB9MLNQGq7LsAlu1JbJT8z2c/values/${sheet}?key=AIzaSyA2_bidIknu2OMPDaAtWNsIZmBCsIoB4EU&access_token=${accesstoken}`,
			headers: {
				'Content-Type': 'application/json'
			},
			data: data
		};

		if (method == "post") {
			config.url += "&valueInputOption=RAW"
		}

		let response = await axios.request(config).then((response) => {
			return response.data
		}).catch((error) => {
			Swal.fire({
				title: 'Error',
				text: 'Hubo un error en la aplicación.',
				icon: 'error',
				confirmButtonText: 'Recargar'
			}).then(() => {
				window.location = "/"; // Recargar la página
			})
		});
		return response
	};
	const sheetsDeleteRows = async (accesstoken, sheet, method, row) => {
		/*------------------------ saber SHEETID Viaje start----------------------------*/
		let configKnowID = {
			method: "get",
			maxBodyLength: Infinity,
			url: `https://sheets.googleapis.com/v4/spreadsheets/1pyseGpCf96sJy-F_7OSkB9MLNQGq7LsAlu1JbJT8z2c/values/viajes!C${Number(row) + 1}?key=AIzaSyA2_bidIknu2OMPDaAtWNsIZmBCsIoB4EU&access_token=${accesstoken}`,
			headers: {
				'Content-Type': 'application/json'
			},
		};

		let responseKnowID = await axios.request(configKnowID).then((response) => {
			return response.data
		}).catch((error) => {
			Swal.fire({
				title: 'Error',
				text: 'Hubo un error en la aplicación.',
				icon: 'error',
				confirmButtonText: 'Recargar'
			}).then(() => {
				window.location = "/"; // Recargar la página
			})
		});
		/*------------------------ eliminar SHEETID Viaje start ----------------------------*/
		let dataDeleteSheet = JSON.stringify(
			{
				"requests": [
					{
						"deleteSheet": {
							"sheetId": responseKnowID.values[0][0]
						}
					}
				]
			}
		);
		let configDeleteSheet = {
			method: "post",
			maxBodyLength: Infinity,
			url: `https://sheets.googleapis.com/v4/spreadsheets/1pyseGpCf96sJy-F_7OSkB9MLNQGq7LsAlu1JbJT8z2c:batchUpdate?key=AIzaSyA2_bidIknu2OMPDaAtWNsIZmBCsIoB4EU&access_token=${accesstoken}`,
			headers: {
				'Content-Type': 'application/json'
			},
			data: dataDeleteSheet
		};

		await axios.request(configDeleteSheet).then((response) => {
			return response.data
		}).catch((error) => {
			Swal.fire({
				title: 'Error',
				text: 'Hubo un error en la aplicación.',
				icon: 'error',
				confirmButtonText: 'Recargar'
			}).then(() => {
				window.location = "/"; // Recargar la página
			})
		});
		/*------------------------ eliminar SHEETID Viaje end ----------------------------*/
		/*------------------------ saber SHEETID Viaje end ----------------------------*/
		let data = JSON.stringify(
			{
				"dataFilters": [
					{
						"gridRange": {
							"sheetId": sheet,
							"startRowIndex": row,
							"endRowIndex": Number(row) + 1,
							"startColumnIndex": 1,
							"endColumnIndex": 3
						}
					}
				]
			}
		);

		let config = {
			method: method,
			maxBodyLength: Infinity,
			url: `https://sheets.googleapis.com/v4/spreadsheets/1pyseGpCf96sJy-F_7OSkB9MLNQGq7LsAlu1JbJT8z2c/values:batchClearByDataFilter?key=AIzaSyA2_bidIknu2OMPDaAtWNsIZmBCsIoB4EU&access_token=${accesstoken}`,
			headers: {
				'Content-Type': 'application/json'
			},
			data: data
		};

		let response = await axios.request(config).then((response) => {
			return response.data
		}).catch((error) => {
			Swal.fire({
				title: 'Error',
				text: 'Hubo un error en la aplicación.',
				icon: 'error',
				confirmButtonText: 'Recargar'
			}).then(() => {
				window.location = "/"; // Recargar la página
			})
		});
		return response.data
	};
	const makeSheet = async (accesstoken, sheet, method, datos) => {
		/*------------------------ Se Copia el Viaje start ----------------------------*/
		let dataCopySheet = JSON.stringify(
			{
				"destinationSpreadsheetId": "1pyseGpCf96sJy-F_7OSkB9MLNQGq7LsAlu1JbJT8z2c"
			}
		);

		let configCopySheet = {
			method: method,
			maxBodyLength: Infinity,
			url: `https://sheets.googleapis.com/v4/spreadsheets/1pyseGpCf96sJy-F_7OSkB9MLNQGq7LsAlu1JbJT8z2c/sheets/885177783:copyTo?key=AIzaSyA2_bidIknu2OMPDaAtWNsIZmBCsIoB4EU&access_token=${accesstoken}`,
			headers: {
				'Content-Type': 'application/json'
			},
			data: dataCopySheet
		};

		let responseCopySheet = await axios.request(configCopySheet).then((response) => {
			return response.data
		}).catch((error) => {
			Swal.fire({
				title: 'Error',
				text: 'Hubo un error en la aplicación.',
				icon: 'error',
				confirmButtonText: 'Recargar'
			}).then(() => {
				window.location = "/"; // Recargar la página
			})
		});
		/*------------------------ Se Copia el Viaje end ----------------------------*/
		/*------------------------ Se agrega Viaje Start ----------------------------*/
		datos.push(responseCopySheet.sheetId)
		let data = JSON.stringify({
			"values": [
				datos
			]
		});

		let config = {
			method: method,
			maxBodyLength: Infinity,
			url: `https://sheets.googleapis.com/v4/spreadsheets/1pyseGpCf96sJy-F_7OSkB9MLNQGq7LsAlu1JbJT8z2c/values/${sheet}?key=AIzaSyA2_bidIknu2OMPDaAtWNsIZmBCsIoB4EU&access_token=${accesstoken}&valueInputOption=RAW`,
			headers: {
				'Content-Type': 'application/json'
			},
			data: data
		};

		let response = await axios.request(config).then((response) => {
			return response.data
		}).catch((error) => {
			Swal.fire({
				title: 'Error',
				text: 'Hubo un error en la aplicación.',
				icon: 'error',
				confirmButtonText: 'Recargar'
			}).then(() => {
				window.location = "/"; // Recargar la página
			})
		});
		let getFromName = response.updates.updatedRange
		let idFromName = getFromName.split("C");
		let newFromId = "Viaje" + String(Number(idFromName[1]) - 1);
		/*------------------------ Se agrega Viaje End ----------------------------*/
		let dataChangeNameSheet = JSON.stringify(
			{
				"requests": [
					{
						"updateSheetProperties": {
							"properties": {
								"sheetId": responseCopySheet.sheetId,
								"title": newFromId
							},
							"fields": "title"
						}
					}
				]
			}
		);

		let configChangeNameSheet = {
			method: method,
			maxBodyLength: Infinity,
			url: `https://sheets.googleapis.com/v4/spreadsheets/1pyseGpCf96sJy-F_7OSkB9MLNQGq7LsAlu1JbJT8z2c:batchUpdate?key=AIzaSyA2_bidIknu2OMPDaAtWNsIZmBCsIoB4EU&access_token=${accesstoken}`,
			headers: {
				'Content-Type': 'application/json'
			},
			data: dataChangeNameSheet
		};

		let responseChangeNameSheet = await axios.request(configChangeNameSheet).then((response) => {
			return response.data
		}).catch((error) => {
			Swal.fire({
				title: 'Error',
				text: 'Hubo un error en la aplicación.',
				icon: 'error',
				confirmButtonText: 'Recargar'
			}).then(() => {
				window.location = "/"; // Recargar la página
			})
		});
		return responseChangeNameSheet.responseChangeNameSheet;
	};
	const makeSheetClient = async (accesstoken, sheet, method, datos) => {
		/*------------------------ Se Copia el Viaje start ----------------------------*/
		let dataCopySheet = JSON.stringify(
			{
				"destinationSpreadsheetId": "1pyseGpCf96sJy-F_7OSkB9MLNQGq7LsAlu1JbJT8z2c"
			}
		);

		let configCopySheet = {
			method: method,
			maxBodyLength: Infinity,
			url: `https://sheets.googleapis.com/v4/spreadsheets/1pyseGpCf96sJy-F_7OSkB9MLNQGq7LsAlu1JbJT8z2c/sheets/185292258:copyTo?key=AIzaSyA2_bidIknu2OMPDaAtWNsIZmBCsIoB4EU&access_token=${accesstoken}`,
			headers: {
				'Content-Type': 'application/json'
			},
			data: dataCopySheet
		};

		let responseCopySheet = await axios.request(configCopySheet).then((response) => {
			return response.data
		}).catch((error) => {
			Swal.fire({
				title: 'Error',
				text: 'Hubo un error en la aplicación.',
				icon: 'error',
				confirmButtonText: 'Recargar'
			}).then(() => {
				window.location = "/"; // Recargar la página
			})
		});
		/*------------------------ Se Copia el Viaje end ----------------------------*/
		/*------------------------ Se agrega Viaje Start ----------------------------*/
		datos.push(responseCopySheet.sheetId)
		let data = JSON.stringify({
			"values": [
				datos
			]
		});

		let config = {
			method: method,
			maxBodyLength: Infinity,
			url: `https://sheets.googleapis.com/v4/spreadsheets/1pyseGpCf96sJy-F_7OSkB9MLNQGq7LsAlu1JbJT8z2c/values/${sheet}?key=AIzaSyA2_bidIknu2OMPDaAtWNsIZmBCsIoB4EU&access_token=${accesstoken}&valueInputOption=RAW`,
			headers: {
				'Content-Type': 'application/json'
			},
			data: data
		};

		let response = await axios.request(config).then((response) => {
			return response.data
		}).catch((error) => {
			Swal.fire({
				title: 'Error',
				text: 'Hubo un error en la aplicación.',
				icon: 'error',
				confirmButtonText: 'Recargar'
			}).then(() => {
				window.location = "/"; // Recargar la página
			})
		});
		//console.log(response);
		let getFromName = response.updates.updatedRange

		const infoUser = await sheets(accesstoken, getFromName, "get")
		let newFromId = "Cliente_" + infoUser.values[0][0];
		/*------------------------ Se agrega Viaje End ----------------------------*/
		let dataChangeNameSheet = JSON.stringify(
			{
				"requests": [
					{
						"updateSheetProperties": {
							"properties": {
								"sheetId": responseCopySheet.sheetId,
								"title": newFromId
							},
							"fields": "title"
						}
					}
				]
			}
		);

		let configChangeNameSheet = {
			method: method,
			maxBodyLength: Infinity,
			url: `https://sheets.googleapis.com/v4/spreadsheets/1pyseGpCf96sJy-F_7OSkB9MLNQGq7LsAlu1JbJT8z2c:batchUpdate?key=AIzaSyA2_bidIknu2OMPDaAtWNsIZmBCsIoB4EU&access_token=${accesstoken}`,
			headers: {
				'Content-Type': 'application/json'
			},
			data: dataChangeNameSheet
		};

		let responseChangeNameSheet = await axios.request(configChangeNameSheet).then((response) => {
			return response.data
		}).catch((error) => {
			Swal.fire({
				title: 'Error',
				text: 'Hubo un error en la aplicación.',
				icon: 'error',
				confirmButtonText: 'Recargar'
			}).then(() => {
				window.location = "/"; // Recargar la página
			})
		});
		return responseChangeNameSheet.responseChangeNameSheet;
	};
	const makeAbono = async (accesstoken, sheet, datos) => {
		let data = JSON.stringify({
			"values": [
				datos
			]
		});

		let config = {
			method: "get",
			maxBodyLength: Infinity,
			url: `https://sheets.googleapis.com/v4/spreadsheets/1pyseGpCf96sJy-F_7OSkB9MLNQGq7LsAlu1JbJT8z2c/values/${sheet}?key=AIzaSyA2_bidIknu2OMPDaAtWNsIZmBCsIoB4EU&access_token=${accesstoken}`,
			headers: {
				'Content-Type': 'application/json'
			},
			//data: data
		};

		let response = await axios.request(config).then((response) => {
			return response.data
		}).catch((error) => {
			Swal.fire({
				title: 'Error',
				text: 'Hubo un error en la aplicación.',
				icon: 'error',
				confirmButtonText: 'Recargar'
			}).then(() => {
				window.location = "/"; // Recargar la página
			})
		});
		/*make abono*/
		let configAbono = {
			method: "post",
			maxBodyLength: Infinity,
			url: `https://sheets.googleapis.com/v4/spreadsheets/1pyseGpCf96sJy-F_7OSkB9MLNQGq7LsAlu1JbJT8z2c/values/${sheet}!C${response.values.length + 1}:append?key=AIzaSyA2_bidIknu2OMPDaAtWNsIZmBCsIoB4EU&access_token=${accesstoken}&valueInputOption=RAW`,
			headers: {
				'Content-Type': 'application/json'
			},
			data: data
		};
		let responseAbono = await axios.request(configAbono).then((response) => {
			return response.data
		}).catch((error) => {
			Swal.fire({
				title: 'Error',
				text: 'Hubo un error en la aplicación.',
				icon: 'error',
				confirmButtonText: 'Recargar'
			}).then(() => {
				window.location = "/"; // Recargar la página
			})
		});

		return responseAbono
	};
	const makeCobro = async (accesstoken, sheet, method, datos, data) => {
		let valuesViaje = JSON.stringify({
			"values": [
				datos
			]
		});
		let config = {
			method: method,
			maxBodyLength: Infinity,
			url: `https://sheets.googleapis.com/v4/spreadsheets/1pyseGpCf96sJy-F_7OSkB9MLNQGq7LsAlu1JbJT8z2c/values/${sheet}?key=AIzaSyA2_bidIknu2OMPDaAtWNsIZmBCsIoB4EU&access_token=${accesstoken}`,
			headers: {
				'Content-Type': 'application/json'
			},
			data: valuesViaje
		};
		if (method == "post") {
			config.url += "&valueInputOption=RAW"
		}
		let response = await axios.request(config).then((response) => {
			return response.data
		}).catch((error) => {
			Swal.fire({
				title: 'Error',
				text: 'Hubo un error en la aplicación.',
				icon: 'error',
				confirmButtonText: 'Recargar'
			}).then(() => {
				window.location = "/"; // Recargar la página
			})
		});


		let configKnowID = {
			method: "get",
			maxBodyLength: Infinity,
			url: `https://sheets.googleapis.com/v4/spreadsheets/1pyseGpCf96sJy-F_7OSkB9MLNQGq7LsAlu1JbJT8z2c/values/Cliente_${datos[0]}?key=AIzaSyA2_bidIknu2OMPDaAtWNsIZmBCsIoB4EU&access_token=${accesstoken}`,
			headers: {
				'Content-Type': 'application/json'
			},
		};

		let responseKnowID = await axios.request(configKnowID).then((response) => {
			return response.data
		}).catch((error) => {
			Swal.fire({
				title: 'Error',
				text: 'Hubo un error en la aplicación.',
				icon: 'error',
				confirmButtonText: 'Recargar'
			}).then(() => {
				window.location = "/"; // Recargar la página
			})
		});

		let precio = formatToCurrency((Number(data.costGrueso) * formatToNumber(data.costGruesoPircing)) + (Number(data.costSegundas) * formatToNumber(data.costSegundasPircing)) + (Number(data.costPica) * formatToNumber(data.costPicaPircing)) + (Number(data.costMaduro) * formatToNumber(data.costMaduroPircing)))
		const valorFormateado = precio.replace(/\./g, '')

		let dataUser = JSON.stringify({
			"values": [
				[
					data.viaje,
					new Date().toISOString().slice(0, 10),
					`Gueso:${data.costGrueso}x${data.costGruesoPircing}\n Segundas:${data.costSegundas}x${data.costSegundasPircing}\n Picas:${data.costPica}x${data.costPicaPircing}\n Maduro:${data.costMaduro}x${data.costMaduroPircing}`,
					parseFloat(valorFormateado)
				]
			]
		});
		let configUser = {
			method: method,
			maxBodyLength: Infinity,
			url: `https://sheets.googleapis.com/v4/spreadsheets/1pyseGpCf96sJy-F_7OSkB9MLNQGq7LsAlu1JbJT8z2c/values/Cliente_${datos[0]}!B${responseKnowID.values.length + 1}:append?key=AIzaSyA2_bidIknu2OMPDaAtWNsIZmBCsIoB4EU&access_token=${accesstoken}`,
			headers: {
				'Content-Type': 'application/json'
			},
			data: dataUser
		};
		if (method == "post") {
			configUser.url += "&valueInputOption=RAW"
		}

		let responseUser = await axios.request(configUser).then((response) => {
			return response.data
		}).catch((error) => {
			Swal.fire({
				title: 'Error',
				text: 'Hubo un error en la aplicación.',
				icon: 'error',
				confirmButtonText: 'Recargar'
			}).then(() => {
				window.location = "/"; // Recargar la página
			})
		});
		return responseUser
	};
	const findColumn = async (accesstoken, sheet, valueToFind) => {

		let config = {
			method: "get",
			maxBodyLength: Infinity,
			url: `https://sheets.googleapis.com/v4/spreadsheets/1pyseGpCf96sJy-F_7OSkB9MLNQGq7LsAlu1JbJT8z2c/values/${sheet}?key=AIzaSyA2_bidIknu2OMPDaAtWNsIZmBCsIoB4EU&access_token=${accesstoken}`,
			headers: {
				'Content-Type': 'application/json'
			},
		};

		const found = [];
		let response = await axios.request(config).then((response) => {
			return response.data
		}).catch((error) => {
			Swal.fire({
				title: 'Error',
				text: 'Hubo un error en la aplicación.',
				icon: 'error',
				confirmButtonText: 'Recargar'
			}).then(() => {
				window.location = "/"; // Recargar la página
			})
		});

		response.values.forEach((row, rowIndex) => {
			row.forEach((value, columnIndex) => {
				if (value === valueToFind) {
					found.push({
						value: valueToFind,
						rowIndex: rowIndex + 1,
						columnIndex: columnIndex + 1,
					});
				}
			});
		});

		return found
	};
	inject('sheets', sheets);
	inject('sheetsDeleteRows', sheetsDeleteRows);
	inject('makeSheet', makeSheet);
	inject('makeSheetClient', makeSheetClient);
	inject('makeAbono', makeAbono);
	inject('makeCobro', makeCobro);
	inject('findColumn', findColumn);
};
