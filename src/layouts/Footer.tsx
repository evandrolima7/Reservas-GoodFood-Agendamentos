export const Footer = () => {
    return(
        <div>
            <footer className="bg-black text-white w-full border-2 border-t-amber-400 p-4">
        <div className="container">
          <div className="row">
            <div className="col-md-4">
              <h5>Links Úteis</h5>
              <ul className="list-unstyled">
                <li><a href="#" className="text-white">Sobre nós</a></li>
                <li><a href="#" className="text-white">Menu</a></li>
                <li><a href="#" className="text-white">Contato</a></li>
                <li><a href="#" className="text-white">Política de Privacidade</a></li>
              </ul>
            </div>
      
            <div className="col-md-4">
              <h5>Contato</h5>
              <p>Endereço: Av Paulista, 123, São Paulo</p>
              <p>Telefone: (11) 1234-5678</p>
              <p>Email: goodfoood@exemplo.com</p>
            </div>
      
            <div className="col-md-4">
              <h5>Siga-nos</h5>
              <a href="#" className="text-white me-2"><i className="bi bi-facebook">goodfoood.facebook</i></a>
              <a href="#" className="text-white me-2"><i className="bi bi-instagram">@goodfoood.instagram</i></a>
            </div>
          </div>
      
          <div className="row mt-4">
            <div className="col text-center">
              <p>&copy; 2024 Good Food. Todos os direitos reservados.</p>
            </div>
          </div>
        </div>
      </footer>
        </div>
    )
}