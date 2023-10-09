package LogSign;

import java.io.IOException;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
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
 * Servlet implementation class Inscription
 */
@WebServlet("/Inscription")
public class Inscription extends HttpServlet {
	private static final long serialVersionUID = 1L;
       
    /**
     * @see HttpServlet#HttpServlet()
     */
    public Inscription() {
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
			String userName = request.getParameter("username");
			String email = request.getParameter("email");
			String password = request.getParameter("password");
			boolean validate = VerifyElementInDatabase(email, conn);
			if(validate) {
				DataInsert(userName, email, password, conn);
				//mettre la variable username dans la session
				response.sendRedirect("/ProjetSae/home");
			}
			
		} catch (SQLException | ClassNotFoundException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
	}
	
	private void DataInsert(String userName, String email, String password, Connection conn) {
		try {
			String insertUser = "INSERT INTO user (username, email, password) values (?,?,?)" ;
			PreparedStatement pstm;
			pstm = conn.prepareStatement(insertUser);
			pstm.setString(1, userName);
			pstm.setString(2, email);
			pstm.setString(3, password);
			int responseInsert = pstm.executeUpdate();
		} catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
	}

	private boolean VerifyElementInDatabase(String email, Connection conn){
		boolean validate = true;
		try {
			String req = "SELECT email FROM user";
			Statement stmt = conn.createStatement();
			ResultSet res = stmt.executeQuery(req);
			while (res.next()){
				if(res.getString("email") != null) {
					if(res.getString("email").equals(email)) {
						validate = false;
					}
				}
			}
			return validate;
		} catch (SQLException e) {
			e.printStackTrace();
		}
		return validate;
	}

	/**
	 * @see HttpServlet#doPost(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		// TODO Auto-generated method stub
		doGet(request, response);
	}

}
