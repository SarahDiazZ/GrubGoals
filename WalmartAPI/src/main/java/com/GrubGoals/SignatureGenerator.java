package com.GrubGoals;

import java.io.IOException;
import java.io.ObjectStreamException;
import java.net.MalformedURLException;
import java.security.KeyRep;
import java.security.PrivateKey;
import java.security.Signature;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.Map;
import java.util.Set;
import java.util.SortedSet;
import java.util.TreeSet;

import org.apache.commons.codec.binary.Base64;

public class SignatureGenerator {

    public Map<String, String> apiHeaders() {
        APIKeys keys = new APIKeys();
        ArrayList<String> keysList = keys.getKeys();
        SignatureGenerator generator = new SignatureGenerator();
        String priviateKeyVersion = "1";
        String consumerId = keysList.get(0);
        String key = keysList.get(1);


        long intimestamp = System.currentTimeMillis();

        Map<String, String> map = new HashMap<>();
        map.put("WM_CONSUMER.ID", consumerId);
        map.put("WM_CONSUMER.INTIMESTAMP", Long.toString(intimestamp));
        map.put("WM_SEC.KEY_VERSION", priviateKeyVersion);

        String[] array = canonicalize(map);

        String data = null;

        try {
            data = generator.generateSignature(key, array[1]);
        } catch(Exception e) { }
        
        Map<String, String> headers = new HashMap<>();
        headers.put("WM_SEC.KEY_VERSION", priviateKeyVersion);
        headers.put("WM_CONSUMER.ID", consumerId);
        headers.put("WM_CONSUMER.INTIMESTAMP", Long.toString(intimestamp));
        headers.put("WM_SEC.AUTH_SIGNATURE", data);

        return headers;
    }

    public String generateSignature(String key, String stringToSign) throws Exception {
        Signature signatureInstance = Signature.getInstance("SHA256WithRSA");

        ServiceKeyRep keyRep = new ServiceKeyRep(KeyRep.Type.PRIVATE, "RSA", "PKCS#8", Base64.decodeBase64(key));

        PrivateKey resolvedPrivateKey = (PrivateKey) keyRep.readResolve();

        signatureInstance.initSign(resolvedPrivateKey);

        byte[] bytesToSign = stringToSign.getBytes("UTF-8");
        signatureInstance.update(bytesToSign);
        byte[] signatureBytes = signatureInstance.sign();

        String signatureString = Base64.encodeBase64String(signatureBytes);

        return signatureString;
    }

    protected static String[] canonicalize(Map<String, String> headersToSign) {
        StringBuffer canonicalizedStrBuffer=new StringBuffer();
        StringBuffer parameterNamesBuffer=new StringBuffer();
        Set<String> keySet=headersToSign.keySet();

        // Create sorted key set to enforce order on the key names
        SortedSet<String> sortedKeySet=new TreeSet<String>(keySet);
        for (String key :sortedKeySet) {
            Object val=headersToSign.get(key);
            parameterNamesBuffer.append(key.trim()).append(";");
            canonicalizedStrBuffer.append(val.toString().trim()).append("\n");
        }
        return new String[] {parameterNamesBuffer.toString(), canonicalizedStrBuffer.toString()};
    }

    class ServiceKeyRep extends KeyRep  {
        private static final long serialVersionUID = -7213340660431987616L;
        public ServiceKeyRep(Type type, String algorithm, String format, byte[] encoded) {
            super(type, algorithm, format, encoded);
        }
        protected Object readResolve() throws ObjectStreamException {
            return super.readResolve();
        }
    }
}