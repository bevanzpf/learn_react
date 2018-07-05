package spider;
import com.google.gson.JsonObject;
import com.google.gson.JsonParser;
import java.io.*;
import java.net.URL;
import java.net.URLConnection;
import java.nio.charset.Charset;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.*;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

public class NewDiary {

    private static final int TRIES = 2;
    private static final int TIMEOUT = 30;

    public static String get_res(String url, Map<String, String> headers) {
        int time = 0;
        StringBuilder builder = new StringBuilder();
        while(time < TRIES) {
            try {
                URL path = new URL(url);
                URLConnection conn = path.openConnection();
                if(headers != null) {
                    Set<Map.Entry<String, String>> entries = headers.entrySet();
                    for (Map.Entry<String, String> e : entries) {
                        conn.addRequestProperty(e.getKey(), e.getValue());
                    }
                }
                BufferedReader contentReader = new BufferedReader(new InputStreamReader(conn.getInputStream()));
                String line = null;
                while ((line = contentReader.readLine()) != null) {
                    builder.append(line);
                }
                break;
            } catch (IOException e) {
                time++;
                System.out.println(e);
                continue;
            }
        }
        return builder.toString();
    }

    public static Map<String,String> getLocationInfo(){
        String ip_api = "http://ip-api.com/json/?lang=en";
        String api_res = get_res(ip_api, null);
        JsonObject obj = covertstr2JSONObject(api_res);
        Map<String,String> result = new HashMap<>();
        result.put("country", obj.get("country").toString().replace("\"", ""));
        result.put("regionName", obj.get("regionName").toString().replace("\"", ""));
        result.put("city", obj.get("city").toString().replace("\"", ""));
        return result;
    }

    public static JsonObject covertstr2JSONObject(String str){
        JsonParser parser = new JsonParser();
        JsonObject obj = (JsonObject) parser.parse(str);
        return obj;
    }

    public static String getWeatherInfo(String country, String regionName, String city){
        String url = "https://tianqi.moji.com/weather/%s/%s/%s";
        String weatherUrl = String.format(url,country, regionName, city);
        System.out.println(weatherUrl);
        String weatherRes = get_res(weatherUrl, null);
        System.out.println(weatherRes);
        Pattern p = Pattern.compile("市今天实况：(\\S+\\s\\S+)，");
        Matcher m = p.matcher(weatherRes);
        if(m.find()){
            return weatherRes.substring(m.start(1), m.end(1));
        }
        return null;
    }

    public static String getWeek(){
        int week = Calendar.getInstance().get(Calendar.DAY_OF_WEEK);
        Map<Integer, String> map = new HashMap<>();
        map.put(1, "SUN.");
        map.put(2, "MON.");
        map.put(3, "TUE.");
        map.put(4, "WED.");
        map.put(5, "THU.");
        map.put(6, "FRI.");
        map.put(7, "STA.");
        return map.get(week);
    }

    public static void createNewDiary() throws IOException, InterruptedException {

        Date today = Calendar.getInstance().getTime();
        DateFormat df = new SimpleDateFormat("yyyy-MM-dd");
        String dayString = df.format(today);
        Map<String, String> locationInfo = getLocationInfo();
        String city = locationInfo.get("city");
        String regionName = locationInfo.get("regionName");
        String country = locationInfo.get("country");
        String weather = getWeatherInfo(country, regionName,city);
        String week = getWeek();
        String str2Wirte = String.format("__date:__ %s   \r\n" +
                "__week:__ %s  \r\n" +
                "__weather:__ %s  \r\n" +
                "__location:__ %s  \r\n",dayString, week, weather, city);

        Path file = Paths.get("./" + dayString + ".md");
        Charset charset = Charset.forName("UTF-8");
        BufferedWriter writer = Files.newBufferedWriter(file, charset);
        writer.write(str2Wirte);
        writer.close();
        // Java 开进程 方法1
        Process p = Runtime.getRuntime().exec("cat ./" + dayString + ".md");
        InputStream in= p.getInputStream();
        BufferedReader reader = new BufferedReader(new InputStreamReader(in));
        p.waitFor();
        if(p.exitValue() != 0){
            //存在错误
        }
        String line = null;
        while((line = reader.readLine()) != null){
            System.out.println(line);
        }

        //Java开进程方法2
        String command = "cat ./" +dayString + ".md";
        List<String> lcommand = new ArrayList<>(Arrays.asList(command.split(" ")));
        ProcessBuilder pb = new ProcessBuilder(lcommand);
        pb.redirectErrorStream(true);
        Process process = pb.start();
        InputStream in2 = process.getInputStream();
        BufferedReader reader2 = new BufferedReader(new InputStreamReader(in2));
        process.waitFor();
        if(process.exitValue() != 0){

        }

        while((line = reader2.readLine()) != null){
            System.out.println(line);
        }


    }

    public static void main(String[] args) {
        try {
            createNewDiary();
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}
