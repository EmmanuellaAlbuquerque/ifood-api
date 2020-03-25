import database from "../../database";

// categoria : popular
// tipo_entrga : gratis x rapida
// gratis: descontados R$ 2,00 por pedido
// rapida: acrescentados R$ 2,00 por pedido

class RestauranteRepository {
  async criarRestaurante(restaurante) {
    try {
      const result = await database.client.query(
        `INSERT INTO usuario(nome, provedor, senha, email, endereco, categoria, status, tipo_entrega) 
        VALUES($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *;`,
        restaurante
      );

      console.log(result);
      console.log(result.rows[0])
      return result.rows[0];
    } catch (err) {
      return err;
    }
  }

  async findOne(id_restaurante) {
    try {
      const result = await database.client.query(
        `SELECT * FROM usuario 
        WHERE id = $1`,
        id_restaurante
      );

      return result.rows;
    } catch (err) {
      return err;
    }
  }

  async findAll() {
    try {
      const result = await database.client.query("SELECT * FROM usuario");

      const restaurantes = result.rows.filter(usuario => usuario.provedor)

      return restaurantes;
    } catch (err) {
      return err;
    }
  }

  async findByDescricao(palavra) {
    try {
      const result = await database.client.query(`
        SELECT * FROM usuario 
        INNER JOIN comida
        ON usuario.id = comida.id_restaurante
        WHERE comida.descricao LIKE '%$1%'

      `, palavra)
    } catch(err) {
      return err
    }
  }

  async findRestauranteByName(nome_restaurante) {
    console.log(nome_restaurante)
    console.log("dasdasd")
    try {
      const result = await database.client.query(`
        SELECT * FROM usuario
        WHERE nome LIKE $1
      `, [`%${nome_restaurante}%`])

      return result.rows
    } catch (err) {
      return err
    }
  }
}

export default new RestauranteRepository();
