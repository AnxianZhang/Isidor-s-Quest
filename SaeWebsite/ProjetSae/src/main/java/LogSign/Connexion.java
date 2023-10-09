package LogSign;

import java.io.IOException;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;

import javax.servlet.ServletContext;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

/**
 * Servlet implementation class Connexion
 */
@WebServlet("/Connexion")
public class Connexion extends HttpServlet {
	private static final long serialVersionUID = 1L;
       
    /**
     * @see HttpServlet#HttpServlet()
     */
    public Connexion() {
        super();
        // TODO Auto-generated constructor stub
    }

	/**
	 * @see HttpServlet#doGet(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		try {
			Class.forName("com.mysql.cj.jdbc.Driver");
			Connection conn = DriverManager.getConnection("jdbc:mysql://localhost:3306/accountUser", "root", "Srilanka23!");
			String email = request.getParameter("email");
			String password = request.getParameter("password");
			boolean validate = VerifyElementInDatabase(email, password, conn);
			if(validate) {
				//mettre les variables dans session
				response.sendRedirect("/ProjetSae/home");
			}
			else {
				//rajouter un truc dans la session pour dire erreur
				response.sendRedirect("/ProjetSae/connexion");
			}
		} catch (ClassNotFoundException | SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
	}
	
	private boolean VerifyElementInDatabase(String email, String password, Connection conn){
		boolean validate = false;
		try {
			String req = "SELECT email, password FROM user";
			Statement stmt = conn.createStatement();
			ResultSet res = stmt.executeQuery(req);
			while (res.next()){
				if(res.getString("email") != null) {
					if(res.getString("email").equals(email) && res.getString("password").equals(password)) {
						validate = true;
					}
				}
			}
			return validate;
		} catch (SQLException e) {
			e.printStackTrace();
		}
		return validate;
	}

}
